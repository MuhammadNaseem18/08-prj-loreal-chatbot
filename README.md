# Project 8: L'Oréal Chatbot

L’Oréal is exploring the power of AI, and your job is to showcase what's possible. Your task is to build a chatbot that helps users discover and understand L’Oréal’s extensive range of products—makeup, skincare, haircare, and fragrances—as well as provide personalized routines and recommendations.

## 🚀 Launch via GitHub Codespaces

1. In the GitHub repo, click the **Code** button and select **Open with Codespaces → New codespace**.
2. Once your codespace is ready, open the `index.html` file via the live preview.

## ☁️ Cloudflare Note

When deploying through Cloudflare, make sure your API request body (in `script.js`) includes a `messages` array and handle the response by extracting `data.choices[0].message.content`.

### Deploy the chatbot proxy

The repository includes a Cloudflare Worker configuration in `wrangler.toml` and the Worker code in `RESOURCE_cloudflare-worker.js`.

1. Install Wrangler or open the Cloudflare dashboard's **Workers & Pages** section.
2. Create a Worker named `loreal-chatbot`.
3. Open **Settings → Variables and Secrets → Add → Secret**, name it `OPENAI_API_KEY`, and paste your key there. Never paste the key into this repository or chat.
4. Deploy the Worker using the included `wrangler.toml`:

   ```bash
   npx wrangler secret put OPENAI_API_KEY
   npx wrangler deploy
   ```

5. Copy the deployed Worker URL into `script.js` by replacing `YOUR_CLOUDFLARE_WORKER_URL`.

The Worker forwards only chat messages to OpenAI, so the browser never receives the API key.

Enjoy building your L’Oréal beauty assistant! 💄
