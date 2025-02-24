import { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import moment from "moment";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { BookRecord } from "@/types/types";
import { bookRecordSchema } from "@/types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const UpdateBookInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(bookRecordSchema),
  });

  useEffect(() => {
    console.log("Print id: " + id);
    axios
      .get(`${import.meta.env.VITE_BOOKS_ENDPOINT}/books/` + id)
      .then((res) => {
        const result = bookRecordSchema.safeParse(res.data);
        console.log(result);
        if (result.success) {
          form.reset(result.data);
        } else {
          console.log("Cannot Fetch Book Details!");
        }
      })
      .catch(() => {
        console.log("Error from ShowBookDetails");
      });
  }, []);

  const onsubmit = async (data: BookRecord) => {
    console.log("hi");
    console.log(data);
    await axios
      .put(`${import.meta.env.VITE_BOOKS_ENDPOINT}/books/` + id, data)
      .then(() => {
        navigate("/show-book/" + id);
      })
      .catch(() => {
        console.log("Error in Updatebook!");
      });
  };

  return (
    <div className="">
      <div className="w-full py-3 bg-blue-950 text-center max-sm:text-2xl min-sm:text-4xl text-white border-white border-2 rounded-2xl hover:bg-white hover:text-blue-950">
        <Link to="/">Show Booklist</Link>
      </div>
      <div className="mt-8">
        <h1 className="text-4xl font-bold text-yellow-500 text-center">
          Edit Book
        </h1>
        <div className="place-items-center mt-8 space-y-5">
          <Form {...form}>
            <form className="space-y-8 max-md:w-11/12 min-md:w-[700px]">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Username</FormLabel> */}
                    <FormControl>
                      <Input
                        className="bg-white"
                        placeholder="Title of the Book"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isbn"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Username</FormLabel> */}
                    <FormControl>
                      <Input
                        className="bg-white"
                        placeholder="ISBN"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Username</FormLabel> */}
                    <FormControl>
                      <Input
                        className="bg-white"
                        placeholder="Author"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Username</FormLabel> */}
                    <FormControl>
                      <Input
                        className="bg-white"
                        placeholder="Describe this book"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="published_date"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              moment(field.value).format("DD-MM-YYYY")
                            ) : (
                              <span>Published Date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          className="bg-white"
                          mode="single"
                          //proposed props
                          // format="YYYY-MM-DD"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="publisher"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Username</FormLabel> */}
                    <FormControl>
                      <Input
                        className="bg-white"
                        placeholder="Publisher of this Book"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full h-10 text-lg flex items-center justify-center rounded-2xl bg-blue-950 hover:text-blue-950 text-white border-white border-2 hover:bg-white"
                onClick={form.handleSubmit(onsubmit)}
              >
                Update
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UpdateBookInfo;
