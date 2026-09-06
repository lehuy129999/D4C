const mapping = {
  '%E8%BD%A6%E7%A5%A8%E7%A5%A8': ['vip+watch_vip'],
  'Locket': ['Gold']
};
var ua = $request.headers["User-Agent"] || $request.headers["user-agent"],
    obj = JSON.parse($response.body);

// Thêm thông báo cho người dùng
obj.Attention = "Chúc mừng bạn! Vui lòng không bán hoặc chia sẻ cho người khác!";


var Axtiser = {
    is_sandbox: !1, 
    ownership_type: "PURCHASED", 
    billing_issues_detected_at: null, 
    period_type: "normal", 
    expires_date: "2099-12-18T01:04:17Z", 
    grace_period_expires_date: null, 
    unsubscribe_detected_at: null, 
    original_purchase_date: "2026-07-20T00:00:00Z",  // Cập nhật ngày tham gia
    purchase_date: "2026-07-20T00:00:00Z",  // Cập nhật ngày tham gia
    store: "app_store"
};


var MinhHoang200709 = {
    grace_period_expires_date: null, 
    purchase_date: "2026-07-20T00:00:00Z",  // Cập nhật ngày tham gia
    product_identifier: "com.axtiser.premium.yearly",  // Đã thay đổi tên sản phẩm
    expires_date: "2099-12-18T01:04:17Z"
};

// Kiểm tra user-agent và thay đổi thông tin tương ứng
const match = Object.keys(mapping).find(e => ua.includes(e));

if (match) {
    let [e, s] = mapping[match];
    // Nếu tìm thấy, cập nhật đăng ký và quyền cho người dùng
    s ? (MinhHoang200709.product_identifier = s, obj.subscriber.subscriptions[s] = Axtiser) : obj.subscriber.subscriptions["com.axtiser.premium.yearly"] = Axtiser;
    obj.subscriber.entitlements[e] = MinhHoang200709;
} else {
    // Nếu không tìm thấy, sử dụng mặc định
    obj.subscriber.subscriptions["com.axtiser.premium.yearly"] = Axtiser;
    obj.subscriber.entitlements.pro = MinhHoang200709;
}

// Trả về response với dữ liệu đã chỉnh sửa
$done({ body: JSON.stringify(obj) });
