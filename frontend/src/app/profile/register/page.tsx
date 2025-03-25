import Header from "../../components/Header";
import RegisterForm from "../../components/RegisterForm";
import Footer from "../../components/Footer";

export const metadata = {
  title: "Link Shortener | Register",
  description: "Shorten your links the right way",
};

export default function Register() {
  return (
    <div className="bg-primary">
      <div className="container mx-auto px-4 py-8">
        <Header />

        <RegisterForm />

        <Footer />
      </div>
    </div>
  );
}
