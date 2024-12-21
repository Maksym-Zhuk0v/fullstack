import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const AccordionInfo = ({ className }: { className?: string }) => {
  return (
    <Accordion type="single" collapsible className={className}>
      <AccordionItem value="item-1">
        <AccordionTrigger>How does it work?</AccordionTrigger>
        <AccordionContent>
          Just give us a call and we&apos;ll come to pick up your car, diagnose
          the problem, and give you a quote for the repair. Yes. It adheres to
          the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          We work on all types of cars, from small sedans to large SUVs. Yes. It
          comes with default styles that matches the other components&apos;
          aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes, we offer a 10% discount for first-time customers.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>
          How long does it take to repair my car?
        </AccordionTrigger>
        <AccordionContent>
          The time it takes to repair your car depends on the type of repair and
          the availability of parts. We will give you a more accurate estimate
          when you bring your car in.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-5">
        <AccordionTrigger>Do you have any certifications?</AccordionTrigger>
        <AccordionContent>
          Yes, our mechanics are all certified by the National Institute for
          Automotive Service Excellence (ASE).
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-6">
        <AccordionTrigger>Do you offer any warranties?</AccordionTrigger>
        <AccordionContent>
          Yes, we offer a 12-month/12,000-mile warranty on all repairs. Yes.
          It&apos;s animated by default, but you can disable it if you prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AccordionInfo;
