export const BaseHtml = async ({ children }: any) => {
  const nelindaImage = Bun.file("public/images/astro-nelinda.png");
  const heroImageUrl = `background-image: url('data:image/gif;base64,${Buffer.from(
    await nelindaImage.arrayBuffer()
  ).toString("base64")}'); 
    background-repeat:no-repeat;
    background-size: cover;
    background-position:center;`;
  return (
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Astro Nelinda</title>
        <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
        <style>{await Bun.file("public/css/style.css").text()}</style>
      </head>
      <body class="select-none">
        <div class="fullscreen-chat" style={heroImageUrl}>
          <div class="chat-header">Astro Nelinda</div>
          <div class="chat-body" id="chat-body"></div>
          <div class="chat-input">
            <input
              id="textInput"
              type="text"
              placeholder="Pitajte Nelindu..."
            />
            <button id="askButton">Pitaj</button>
          </div>
        </div>
      </body>
      <script>{await Bun.file("public/js/script.js").text()}</script>
    </html>
  );
};
