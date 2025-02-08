import { Button } from "../ui/Button";


export default function PaymentInfo() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">
        WHAT PAYMENT OPTIONS CAN I USE ON STEPLO ORDERS?
      </h1>
      
      <p className="text-gray-800">
        We want to make buying your favourite Steplo shoes and gear online fast and easy, and we accept the following payment options:
      </p>

      <div className="space-y-4 pl-4">
        <p>Visa, Mastercard, Diners Club, Discover, American Express, Visa Electron, Maestro</p>
        <p>If you enter your PAN information at checkout, you&apos;ll be able to pay for your order with PayTM or a local credit or debit card.</p>
        <p>Apple Pay</p>
      </div>

      <div className="space-y-4">
        <p>
          Steplo Members can store multiple debit or credit cards in their profile for faster checkout. 
          If you&apos;re not already a Member, join us today.
        </p>
        
        <div className="flex gap-4">
          <Button className="rounded-full">JOIN US</Button>
          <Button className="rounded-full">SHOP STEPLO</Button>
        </div>
      </div>
    </div>
  )
}
