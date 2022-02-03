import { http } from "@serverless/cloud";
import cors from "cors";
import { applyGraphqlToExpressApp } from './src/graphql/apollo';
import express from "express";
import cookieParser from "cookie-parser";

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


/**
 *
api.post("/login", login(), async function (req: any, res: any) {
  res.send({
    token: req.token,
    user: req.user,
    systemWarning: req.systemWarning,
  });
});

api.post("/register", register(), async function (req: any, res) {
  res.send({
    token: req.token,
    user: req.user,
    systemWarning: req.systemWarning,
  });
});

api.use(auth());

api.get("/messages", async (req, res) => {
  const result = await data.getMessages(req.query.convId);
  res.json(result);
});

api.post("/messages", async (req, res) => {
  const result = await data.sendMessage(
    req.body.convId,
    req.user.id,
    req.body.text
  );
  res.json(result);
});

api.get("/conversations", async (req, res) => {
  const result = await data.getConversations(req.user.id);
  res.json(result);
});

api.post("/conversations", async (req, res) => {
  const { value } = await data.createConversation(req.body.userIds);
  res.json(value);
});

api.put("/typing", async (req, res) => {
  await data.setTyping(req.user.id, req.body.convId, req.body.typing);
  res.status(200).end();
});

api.put("/me", async (req: any, res) => {
  const user = await data.updateUser(req.user.id, req.body);
  res.json(user);
});

api.get("/users/:userId", async (req, res) => {
  const user = await data.getUser(req.params.userId);
  res.json(user);
});

api.get("/users", async (req, res) => {
  if (req.query["sw.lat"]) {
    const result = await data.listUsersInRect({
      sw: {
        lat: Number.parseFloat(req.query["sw.lat"]),
        lon: Number.parseFloat(req.query["sw.lon"]),
      },
      ne: {
        lat: Number.parseFloat(req.query["ne.lat"]),
        lon: Number.parseFloat(req.query["ne.lon"]),
      },
    });

    res.json(result);
    return;
  }

  if (req.query["center.lat"]) {
    const center = {
      lat: Number.parseFloat(req.query["center.lat"]),
      lon: Number.parseFloat(req.query["center.lon"]),
    };
    const radius = Number.parseFloat(req.query.radius);
    const result = await data.listUsersInCircle(center, radius);
    res.json(result);
    return;
  }

  const users = await data.listAllUsers();
  res.json(users);
});

 */
