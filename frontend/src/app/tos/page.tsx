import Header from "../components/Header";
import Footer from "../components/Footer";
import { GithubIcon } from "lucide-react";

export const metadata = {
  title: "Link Shortener | Shorten links the right way",
  description: "Shorten your links the right way",
};

export default function Page() {
  return (
    <div className="bg-primary">
      <div className="container mx-auto px-4 py-8 md:h-screen">
        {/* Header section */}
        <Header />

        <div className="text-center text-bold">
          <h1 className="text-xl pb-5">Link shortener app information</h1>
          <div className="flex justify-center">
            <a
              href="https://github.com/Shikiiii/link-shortener-site"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon size={32} className="text-blue-600" />
            </a>
          </div>
          <br />
          <p>This project is under the MIT license.</p>
          <p className="max-w-[50%] mx-auto">
            ©Copyright 2025 Link shortener app made by{" "}
            <a href="https://github.com/Shikiiii" className="text-blue-500">
              Shikiiii.
            </a>
            <br />
            Permission is hereby granted, free of charge, to any person
            obtaining a copy of this software and associated documentation files
            (the “Software”), to deal in the Software without restriction,
            including without limitation the rights to use, copy, modify, merge,
            publish, distribute, sublicense, and/or sell copies of the Software,
            and to permit persons to whom the Software is furnished to do so,
            subject to the following conditions: The above copyright notice and
            this permission notice shall be included in all copies or
            substantial portions of the Software. THE SOFTWARE IS PROVIDED “AS
            IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
            NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
            PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
            AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR
            OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
            OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
            OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
          </p>
          <p>
            For more information regarding the License, please visit{" "}
            <a
              href="https://en.wikipedia.org/wiki/MIT_License"
              className="text-blue-500"
            >
              the Wikipedia page.
            </a>
          </p>
        </div>

        {/* Footer Section */}
        <Footer />
      </div>
    </div>
  );
}
