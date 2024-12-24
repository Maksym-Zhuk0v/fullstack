import React from "react";

interface Props {
  code: string;
}

export const VerificationUserTemplate: React.FC<Props> = ({ code }) => (
  <div>
    <p>
      Код подтверждения: <h2>{code}</h2>
    </p>

    <p>
      <a
        href={`http://fullstack-2c96915k4-maks-projects-935572a9.vercel.app/api/auth/verify?code=${code}`}
      >
        Подтвердить регистрацию
      </a>
    </p>
  </div>
);
