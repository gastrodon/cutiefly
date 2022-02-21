import body_parser from "body-parser";
import express from "express";
import url from "url";

import {
  as_decimal,
  as_shortcode,
  random,
  shortcode_base,
  shortcode_size,
} from "./library.js";
import { read_entry, write_entry } from "./store.js";

export const app = express();

const url_field_must = [
  "protocol",
  "host",
  "path",
];

app.use(body_parser.json());

app.get("/:shortcode", async (request, response) => {
  const id = as_decimal(request.params.shortcode);

  if (isNaN(id)) {
    response.status(400).send(`I can't understand the shortcode ${request.params.shortcode}!`);
    return
  }

  try {
    const entry = await read_entry(id);
    response.redirect(301, entry.url);
  } catch {
    response.status(404).send(`I can't find a url for ${request.params.shortcode}!`)
  }

  return;
});

app.post("/", async (request, response) => {
  if (!request.body.url) {
    response.status(400).send("I can't understand .url!");
    return;
  }

  const parsed = url.parse(request.body.url);
  const missing = url_field_must.filter((it) => !parsed[it]);
  if (missing.length !== 0) {
    response.status(400).send(`I'm missing fields ${missing}!`);
    return;
  }

  const id = random(shortcode_base, shortcode_size);
  const shortcode = as_shortcode(id);

  await write_entry(id, request.body.url);
  response.end(`${process.env.CUTIEFLY_HOST}/${shortcode}\n`);
  return;
});
