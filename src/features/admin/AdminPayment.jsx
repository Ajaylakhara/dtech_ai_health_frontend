const AdminPayment = () => {
  return (
    <div className="flex flex-col gap-6 mt-2 h-full">
      <div className="bg-[#1E1F21] rounded-[2rem] p-8 shadow-[0_15px_40px_rgba(0,0,0,0.3)] flex-1 flex flex-col items-center justify-center text-center">
        <h1 className="text-white text-3xl font-bold mb-4">Payment Control</h1>
        <p className="text-slate-400 font-semibold max-w-md">
          Integrate Stripe/PayPal logs or billing transactions within this layout block.
        </p>
      </div>
    </div>
  );
};

export default AdminPayment;

