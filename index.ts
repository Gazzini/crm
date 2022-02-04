import { http } from "@serverless/cloud";
import cors from "cors";
import { applyGraphqlToExpressApp } from './src/graphql/Server';
import express from "express";
import cookieParser from "cookie-parser";
import { AuthMiddleware } from "./src/service/auth/Middleware";

const app = express();
 
/****************************************
 * standard Express middleware
/****************************************/
// Enable requests from ~anywhere, try to ignore CORS:
app.options('*', cors({ credentials: true, origin: true }));
app.use(cors({ credentials: true, origin: true }));
// Parse req.body as JSON:
app.use(express.json());
// Deserialize those cookies:
app.use(cookieParser());

/****************************************
 * Serverless Cloud magic
/****************************************/
// Wrangle the express app into something they can serve:
http.use(app);


/*****************************************
 * Custom auth stuff
 /****************************************/
 app.use(AuthMiddleware.EnrichReqWithUserId);

/****************************************
 * Apollo GraphQL attachment
/****************************************/
// This basically says app.post('/graphql', graphQLHandler);
applyGraphqlToExpressApp(app);

/****************************************
 * fun bonus routes:
/****************************************/
app.get("/pinger", async (req, res) => {
  res.send({ status: "ponger" });
});
