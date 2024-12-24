interface Data {
  to: string;
  text: string;
  subject: string;
}

export async function sendMail(details: Data) {
  await fetch(
    "https://fullstack-2c96915k4-maks-projects-935572a9.vercel.app/:3000/api/mail",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    }
  );
}
