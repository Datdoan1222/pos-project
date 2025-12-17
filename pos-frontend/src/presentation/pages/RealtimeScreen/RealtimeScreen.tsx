import { Link } from "react-router-dom";
import { ROUTES } from "@shared/constants/config";
import { useRealtime } from "./useRealtime";
import { OrderList } from "@presentation/components/realtime/OrderList";
import { Loading } from "@presentation/components/shared/Loading";
import { formatCurrency } from "@shared/utils/formatCurrency";
import { LuBox, LuClipboardCheck, LuHandCoins } from "react-icons/lu";
const RealtimeScreen = () => {
  const { orders, loading, error, totalOrders, totalRevenue, statusRealTime } =
    useRealtime();
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 lg:p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Đơn hàng Realtime
            </h1>
            <p className="text-gray-600">
              Cập nhật tự động khi có đơn hàng mới
            </p>
          </div>
          <Link
            to={ROUTES.POS}
            className="bg-primary-600 hover:bg-primary-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
          >
            Quay lại POS
          </Link>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Tổng đơn hàng</p>
                <p className="text-3xl font-bold text-gray-900">
                  {totalOrders}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <span className="text-blue-600 text-2xl">
                  <LuBox />
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Tổng doanh thu</p>
                <p className="text-2xl font-bold text-primary-600">
                  {formatCurrency(totalRevenue)}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <span className="text-green-600 text-2xl">
                  <LuHandCoins />
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Trạng thái</p>

                <p
                  className={`text-xl font-bold flex items-center gap-2 ${statusRealTime.textColor}`}
                >
                  <span
                    className={`w-3 h-3 rounded-full animate-pulse ${statusRealTime.dotColor}`}
                  />
                  {statusRealTime.text}
                </p>
              </div>

              <div className={`p-3 rounded-lg ${statusRealTime.bgIcon}`}>
                <span className={`text-2xl ${statusRealTime.iconColor}`}>
                  <LuClipboardCheck />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="bg-gray-50">
          {loading && <Loading />}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {!loading && !error && <OrderList orders={orders} />}
        </div>
      </div>
    </div>
  );
};

export default RealtimeScreen;
