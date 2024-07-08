import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const NewsletterSection = () => {
  return (
    <section className=" bg-neutral-white-100 mt-10 py-16 md:mt-16">
      <div className="container flex justify-between flex-col gap-10 md:flex-row md:items-center">
        <div>
          <h3 className="text-2xl font-bold mb-5">Join Our Newsletter</h3>
          <p className="text-sm text-neutral-black-500">
            We love to surprise our subscribers with occasional gifts.
          </p>
        </div>
        <div>
          <form className="flex items-center gap-5 min-w-[300px] max-w-lg md:min-w-96">
            <Input
              placeholder="Your email address"
              className="rounded-none border-black/30 w-full"
            />
            <Button className=" rounded-none">Subscribe</Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
