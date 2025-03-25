import Header from "../../components/Header";
import LoginForm from "../../components/LoginForm";
import Footer from "../../components/Footer";

export const metadata = {
  title: "Link Shortener | Login",
  description: "Shorten your links the right way",
};

export default function Login() {
  return (
    <div className="bg-primary h-screen">
      <div className="container mx-auto px-4 py-8">
        <Header />

        <LoginForm />

        <Footer />
      </div>
    </div>
  );
}
