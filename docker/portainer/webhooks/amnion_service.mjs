import axios from "redaxios";
const url = `https://sys.dev.fltngmmth.com/api/webhooks/${process.env.WEBHOOK_ID}`;

try {
  var response = await axios.post(url);
  console.log(JSON.stringify(response.data));
} catch (e) {
  throw new Error(JSON.stringify(e));
}
