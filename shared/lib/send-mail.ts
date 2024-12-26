interface Data {
  to: string;
  text: string;
  subject: string;
}

export async function sendMail(details: Data) {
  await fetch("http://localhost:3000/api/mail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(details),
  });
}
