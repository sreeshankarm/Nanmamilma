import { useState, useEffect } from "react";
import { useStore } from "../context/store/store";
import HeaderCard from "../components/orders/HeaderCard";
// import StatsCards from "../components/orders/StatsCards";
// import OrderFilters from "../components/orders/OrderFilters";
import OrderList from "../components/orders/OrderList";
import type { Order } from "../typesss/typesss"; // type-only import
import { OrderStatus } from "../typesss/typesss"; // value import
import { useNavigate } from "react-router-dom";
import DatePicker from "../components/orders/Datepicker";

const MyOrdersView: React.FC = () => {
  const {
    orders,
    setActiveView,
    modifyOrder,
    setSelectedOrderIdForReturn,
    returnIntentMessage,
    setReturnIntentMessage,
  } = useStore();

  const navigate = useNavigate();

  const [tab, 
    // setTab
  ] = useState<"UPCOMING" | "PAST">("UPCOMING");
  const [dateFilter,
    //  setDateFilter
    ] = useState("");
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  // -------------------------------
  // FILTER ORDERS
  // -------------------------------

  const filtered = orders.filter((o: Order) => {
    const isPast = o.status === OrderStatus.COMPLETED;

    if (tab === "UPCOMING" && isPast) return false;
    if (tab === "PAST" && !isPast) return false;

    if (tab === "PAST" && dateFilter) {
      const d = new Date(o.createdAt).toISOString().split("T")[0];
      if (d !== dateFilter) return false;
    }

    return true;
  });

  useEffect(() => {
    if (filtered.length && !expandedOrderId) {
      setExpandedOrderId(filtered[0].id);
    }
  }, [filtered]);

  // const upcomingCount = orders.filter(
  //   (o: Order) => o.status === OrderStatus.UPCOMING
  // ).length;
  // const pastCount = orders.filter(
  //   (o: Order) => o.status !== OrderStatus.UPCOMING
  // ).length;

  const today = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState(today);

  return (
    <div className="p-4 pb-24 h-full flex flex-col space-y-3">
      <HeaderCard
        returnIntentMessage={returnIntentMessage}
        clearReturn={() => setReturnIntentMessage(null)}
        openReturns={() => navigate("/damagesReturn")}
      />

      {/* <StatsCards orders={orders} /> */}

      {/* <OrderFilters
        tab={tab}
        setTab={setTab}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        creditAlerts={
          orders.filter((o: Order) =>
            o.remarks?.some((r: string) => r.toLowerCase().includes("credit"))
          ).length
        }
        upcomingCount={upcomingCount}
        pastCount={pastCount}
      /> */}

      {/* Filter Section */}
      <div className="bg-white rounded-2xl border border-gray-500 shadow-sm p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
          <DatePicker
            label="Start Date"
            value={startDate}
            max={endDate}
            onChange={setStartDate}
          />

          <DatePicker
            label="End Date"
            value={endDate}
            min={startDate}
            max={today}
            onChange={setEndDate}
          />

          <button
            onClick={() => {
              // 👉 Add your API call or filtering logic here
              console.log("Fetching orders between:", startDate, endDate);
            }}
            disabled={!startDate || !endDate}
            className="h-11 rounded-xl bg-emerald-600 text-white font-semibold
                 hover:bg-emerald-700 disabled:bg-gray-300
                 transition active:scale-[0.98]"
          >
            Get Orders
          </button>
        </div>
      </div>

      <OrderList
        orders={filtered}
        expanded={expandedOrderId}
        setExpanded={setExpandedOrderId}
        modifyOrder={modifyOrder}
        setActiveView={setActiveView}
        setReturnOrder={setSelectedOrderIdForReturn}
        clearReturnMsg={() => setReturnIntentMessage(null)}
      />
    </div>
  );
};

export default MyOrdersView;
