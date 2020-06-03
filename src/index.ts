import fs from "fs";
import https from "https";
import pdf from "html-pdf";
import { html } from "./html/template.html";


const options: pdf.CreateOptions = { format: 'Letter', header: { height: "5mm" } };
for (let index = 0; index < 15; index++) {
    const per_page = 100;
    const offset = per_page * index;
    https.get(
        `https://lavozdepaillaco.cl/wp-json/wp/v2/posts?page=${index + 1}&offset=${offset}&per_page=${per_page}`,
        (resp) => {
            let body = "";
            resp.on("data", (data) => {
                body += data;
            });
            resp.on("end", async () => {
                if (body !== "") {
                    const datt: any[] = JSON.parse(body);
                    datt.forEach(async (element) => {
                        // const template = fs.readFileSync('./src/html/template.html', 'utf8');
                        const folder = element.date.split("T")[0].split("-");
                        const mes = getMes(folder[1]);
                        let dir = `./tmp/${folder[0]}`;
                        if (!fs.existsSync(dir)) {
                            fs.mkdirSync(dir);
                        }
                        dir = `./tmp/${folder[0]}/${folder[1]}_${mes}`;
                        if (!fs.existsSync(dir)) {
                            fs.mkdirSync(dir);
                        }
                        dir = `./tmp/${folder[0]}/${folder[1]}_${mes}/${folder[2]}`;
                        if (!fs.existsSync(dir)) {
                            fs.mkdirSync(dir);
                        }
                        const stringHtml = html;
                        pdf.create(
                            stringHtml.replace(/{title}/g, `${element.title.rendered}`)
                                .replace(/{link}/g, `${element.link}`)
                                .replace(/{fecha}/g, `${folder[2]} de ${getMes(folder[1])}, ${folder[0]}`)
                                .replace(/{imagen}/g, `${element.jetpack_featured_media_url}`)
                                .replace(/{content.rendered}/g, `${element.content.rendered}`), options
                        ).toFile(`${dir}/${element.slug}.pdf`, function (err: any, res: any) {
                            if (err) return console.log(err);
                            console.log(res); // { filename: '/app/businesscard.pdf' }
                        });
                    });
                    console.log("page " + (index + 1));
                }
                console.log("Nothing for process, index --> " + (index + 1));
            });
        }
    );
}


function getMes(dia: string) {
    const mes = [
        { numero: "01", mes: "enero" },
        { numero: "02", mes: "febrero" },
        { numero: "03", mes: "marzo" },
        { numero: "04", mes: "abril" },
        { numero: "05", mes: "mayo" },
        { numero: "06", mes: "junio" },
        { numero: "07", mes: "julio" },
        { numero: "08", mes: "agosto" },
        { numero: "09", mes: "septiembre" },
        { numero: "10", mes: "octubre" },
        { numero: "11", mes: "noviembre" },
        { numero: "12", mes: "diciembre" }
    ];

    return mes.filter(r => r.numero === dia)[0].mes;
}