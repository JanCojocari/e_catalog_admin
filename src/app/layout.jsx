import Container from "./Components/Container/Container";
import MenuBar from "./Components/MenuBar/MenuBar";

import "./globals.css";
export const metadata = {
  title: "SECatalog Admin",
  description: "Admin panel for SECatalog",
};

export default function RootLayout({ children }) {

  const pages = [
    {
      title: "Utilizatori",
      route: "/users",
    },
    {
      title: "Grupe",
      route: "/groups",
    },
  ]

  return (
    <html lang="en">
      <body className={"flex h-svh"}>
        <MenuBar pages={pages} />
        <Container>
          {children}
        </Container>
      </body>
    </html>
  );
}
