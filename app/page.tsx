import AccordionInfo from "@/shared/components/shared/accordion-info";
import Container from "@/shared/components/shared/Container";
import GetInLineSection from "@/shared/components/shared/get-in-line-section";
import ImgageCarousel from "@/shared/components/shared/image-carousel";
import MainPageSection from "@/shared/components/shared/main-page-section";
import ResurtStories from "@/shared/components/shared/result-stories";

export default async function Home() {
  const images = [
    "https://t4.ftcdn.net/jpg/05/21/93/17/360_F_521931702_TXOHZBa3tLVISome894Zc061ceab4Txm.jpg",
    "https://thumbs.dreamstime.com/b/worker-uniform-disassembles-vehicle-engine-car-service-station-automobile-checking-inspection-professional-diagnostics-173424972.jpg",
    "https://www.shutterstock.com/image-photo/mechanic-man-examining-maintenance-customer-600nw-1505133050.jpg",
    "https://st4.depositphotos.com/1006542/22238/i/450/depositphotos_222385896-stock-photo-male-technician-works-car-engine.jpg",
  ];

  return (
    <div className="w-full mb-12">
      <div className="h-screen w-full -mt-[72px] relative">
        <div
          className="absolute bg-cover inset-0 bg-center bg-no-repeat "
          style={{
            backgroundImage:
              "url(https://repairsmith-prod-wordpress.s3.amazonaws.com/2022/11/mechanic-working-on-engine.jpg)",
          }}
        />
        <MainPageSection />
      </div>
      <Container>
        <ResurtStories />
        <div className="w-full px-12 py-24 flex gap-16 justify-between">
          <ImgageCarousel images={images} className="grow w-0" />
          <div className="grow w-0">
            <h2 className="text-5xl font-bold">
              Here is some exemples of our service
            </h2>
            <p className="text-lg mt-4 font-light text-gray-300">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione
              labore adipisci veritatis quia officia doloribus. Illo eligendi
              itaque asperiores nesciunt ad, nam suscipit debitis alias animi
              consectetur nihil dolorem rem.
            </p>
          </div>
        </div>
        <div className="flex justify-between p-6 gap-6 items-center">
          <div className="w-0 grow">
            <h2 className="text-5xl font-bold">How it works</h2>
            <AccordionInfo />
          </div>
          <img
            className="rounded-lg"
            src="https://img.freepik.com/free-photo/mechanic-hand-checking-fixing-broken-car-car-service-garage_146671-19718.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1728172800&semt=ais_hybrid"
          />
        </div>
      </Container>
      <GetInLineSection className="w-full" />
    </div>
  );
}
