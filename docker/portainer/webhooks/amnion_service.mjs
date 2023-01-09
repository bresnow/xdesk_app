import axios from "redaxios";
import process from "process";
const url = process.env.WEBHOOK_URL ;

try {
  var response = await axios.post(url);
} catch (e) {
  throw new Error(JSON.stringify(e));
}
//