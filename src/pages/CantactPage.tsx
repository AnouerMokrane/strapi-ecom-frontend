import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ContactPage = () => {
  return (
    <div className="container mx-auto my-12 px-6 max-w-2xl">
      <h1 className="text-3xl font-semibold mb-4">Contact Us</h1>
      <p className=" text-gray-600 mb-4">
        If you have any questions, feedback, or concerns, please feel free to
        reach out to us. We'd love to hear from you!
      </p>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <Input
            type="text"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <Input
            type="email"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Message
          </label>
          <textarea className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"></textarea>
        </div>
        <Button type="submit">Send Message</Button>
      </form>
    </div>
  );
};

export default ContactPage;
