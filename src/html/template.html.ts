export const html = `
<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
    <style>

    html {
      zoom: 0.63;
    }

    body {
      font-size:50%;
    }

    .invoice-box {
      max-width: 800px;
      margin: auto;
      padding: 30px;
      border: 1px solid #eee;
      box-shadow: 0 0 10px rgba(0, 0, 0, .15);
      font-size: 12px;
      line-height: 14px;
      font-family: 'Lato', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
      color: #555;
    }
    </style>

    <title>Hello, world!</title>
  </head>
  <body>
    <div class="invoice-box">
      <h3>{title}</h1>
      <a href="{link}" style="font-size: 10px;">{link}</a><br><br>
      <div style="text-align: right">{fecha}</div>
      <hr>
      <img src="{imagen}" width="750" />
      {content.rendered}
    </div>
  </body>
</html>`;