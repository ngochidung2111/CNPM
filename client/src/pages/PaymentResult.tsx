import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/PaymentResult.css';

const PaymentResult: React.FC = () => {
  const { ordCode } = useParams<{ ordCode: string }>();
  const [paymentData, setPaymentData] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get(
          `http://localhost:5000/api/payOS/checkPaymentStatus/${ordCode}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setPaymentData(response.data.paymentData);
      } catch (err) {
        setError('Không thể lấy thông tin thanh toán.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentStatus();
  }, [ordCode]);

  if (isLoading) {
    return (
      <div className="payment-result-container">
        <h1>Kết quả thanh toán</h1>
        <p className="loading-message">Đang tải thông tin giao dịch...</p>
      </div>
    );
  }

  return (
    <div className="payment-result-container">
      <h1>Kết quả thanh toán</h1>
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        paymentData && (
          <div className={`payment-card ${paymentData.status}`}>
            <h2 className="payment-status">
              {paymentData.status === 'PAID' ? '✅ Thanh toán thành công' : '❌ Giao dịch bị hủy'}
            </h2>
            <div className="payment-details">
              <p><strong>Mã giao dịch:</strong> {paymentData.id}</p>
              <p><strong>Mã đơn hàng:</strong> {paymentData.orderCode}</p>
              <p><strong>Số tiền:</strong> {paymentData.amount.toLocaleString()} VND</p>
              <p><strong>Trạng thái:</strong> {paymentData.status}</p>
              <p><strong>Ngày giao dịch:</strong> {new Date(paymentData.createdAt).toLocaleString()}</p>
              {paymentData.status === 'CANCELLED' && paymentData.cancellationReason && (
                <p><strong>Lý do hủy:</strong> {paymentData.cancellationReason}</p>
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default PaymentResult;
