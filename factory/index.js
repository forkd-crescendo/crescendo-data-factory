import fs from "fs";
import faker from "faker";
import dotenv from "dotenv";

import splitArray from "../src/lib/splitArray";
import shuffle from "../src/lib/shuffle";
import videos from "./videos";

const configuration = dotenv.config().parsed;

if (!configuration.SIZE) {
  throw new Error("Environment variables not found!");
}
faker.locale = "es_MX";

const USERS_SIZE = Number.parseInt(configuration.SIZE);

const MUSIC_ROLES = [
  "Cantante",
  "Compositor",
  "DJ",
  "Guitarrista",
  "Tecladista",
  "Pianista",
  "Saxogfonista",
  "Violinista",
  "Bajista",
  "Baterista"
];

const MUSIC_GENRES = [
  "Clásica",
  "Blues",
  "Jazz",
  "R&B",
  "Rock",
  "Metal",
  "Funk",
  "Disco",
  "House",
  "EDM",
  "Pop",
  "Reggae",
  "Hip Hop",
  "Sala",
  "Reggaeton"
];

const LIMA_DISTRICTS = [
  "Ate",
  "Barranco",
  "Breña",
  "Chorrillos",
  "Jesús María",
  "La Molina",
  "Lima",
  "Lince",
  "Los Olivos",
  "Magdalena del Mar",
  "Miraflores",
  "Pueblo Libre",
  "San Borja",
  "San Isidro",
  "San Juan de Lurigancho",
  "San Juan de Miraflores",
  "San Luis",
  "San Martín de Porres",
  "San Miguel",
  "Santiago de Surco",
  "Surquillo",
  "Villa El Salvador"
];

const users = [];
const arraySplited = shuffle(
  splitArray({ size: videos.length, length: USERS_SIZE })
);

let videoIndex = 0;

for (let index = 0; index < USERS_SIZE; index++) {
  const artworkCount = arraySplited[index];

  users.push({
    name: faker.name.findName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    location: "LIMA",
    district: faker.random.arrayElement(LIMA_DISTRICTS),
    musicRole: faker.random.arrayElement(MUSIC_ROLES),
    musicGenre: faker.random.arrayElement(MUSIC_GENRES),
    followerCount: faker.random.number({ min: 20, max: 240 }),
    artworks: videos.slice(videoIndex, videoIndex + artworkCount)
  });

  videoIndex += artworkCount;
}

const JSONStream = JSON.stringify(users, null, 2);
fs.writeFile("users.json", JSONStream, "utf8", err => {
  if (err) {
    throw new Error(err.message);
  }
});
