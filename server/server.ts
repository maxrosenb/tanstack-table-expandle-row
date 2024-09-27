import express from "express";
import cors from "cors";
import { faker } from "@faker-js/faker";

const app = express();
const port = 3001; // Make sure this doesn't conflict with your React app's port

app.use(cors());
app.use(express.json());

interface DataItem {
  id: string;
  name: string;
  age: number;
  email: string;
  phone: string;
  address: string;
  employmentStatus: string;
  eyeColor: string;
}

function generateRandomData(count: number): DataItem[] {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    age: faker.number.int({ min: 18, max: 80 }),
    email: faker.internet.email(),
    phone: faker.phone.number({ style: "national" }),
    address: faker.location.streetAddress(true),
    employmentStatus: faker.helpers.arrayElement([
      "Employed",
      "Unemployed",
      "Self-employed",
    ]),
    eyeColor: faker.helpers.arrayElement(["Brown", "Blue", "Green", "Hazel"]),
  }));
}

app.get("/api/data", (req, res) => {
  const count = parseInt(req.query.count as string) || 10;
  const data = generateRandomData(count);
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
