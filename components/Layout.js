import NavbarComp from "./NavbarComp";

export default function Layout({ children }) {
  return (
    <>
      <NavbarComp />
      <main>
        {children}
      </main>
      {/* <Footer /> */}
    </>
  )
}