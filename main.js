/**
 * BÀI 1: QUẢN LÝ TUYỂN SINH
 */
document.getElementById("btnResult").onclick = function () {
    // 1. Input
    let targetScore = Number(document.getElementById("inputScoreTarget").value);
    let areaScore = Number(document.getElementById("selLocation").value);
    let objectScore = Number(document.getElementById("selUser").value);
    let score1 = Number(document.getElementById("inputScore1").value);
    let score2 = Number(document.getElementById("inputScore2").value);
    let score3 = Number(document.getElementById("inputScore3").value);

    let txtResult = document.getElementById("txtResult");

    // 2. logic
    if (score1 === 0 || score2 === 0 || score3 === 0) {
        txtResult.innerHTML = "Bạn đã rớt. Do có điểm liệt (điểm 0).";
        return; // Dừng chương trình
    }

    let totalScore = score1 + score2 + score3 + areaScore + objectScore;

    // 3. Output
    if (totalScore >= targetScore) {
        txtResult.innerHTML = `Bạn đã ĐẬU. Tổng điểm: ${totalScore}`;
    } else {
        txtResult.innerHTML = `Bạn đã RỚT. Tổng điểm: ${totalScore}`;
    }
};


/**
 * BÀI 2: TÍNH TIỀN ĐIỆN
 */
document.getElementById("btnElecBill").onclick = function () {
    // 1. Input
    let name = document.getElementById("inputElecName").value;
    let kw = Number(document.getElementById("inputKW").value);
    let txtElecBill = document.getElementById("txtElecBill");
    let total = 0;

    if (kw <= 0) {
        txtElecBill.innerHTML = "Số kW phải lớn hơn 0!";
        return;
    }

    // 2. Logic (Lũy tiến)
    if (kw <= 50) {
        total = kw * 500;
    } else if (kw <= 100) {
        total = (50 * 500) + ((kw - 50) * 650);
    } else if (kw <= 200) {
        total = (50 * 500) + (50 * 650) + ((kw - 100) * 850);
    } else if (kw <= 350) {
        total = (50 * 500) + (50 * 650) + (100 * 850) + ((kw - 200) * 1100);
    } else {
        total = (50 * 500) + (50 * 650) + (100 * 850) + (150 * 1100) + ((kw - 350) * 1300);
    }

    // 3. Output
    let formattedTotal = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(total);
    txtElecBill.innerHTML = `Họ tên: ${name}; Tiền điện: ${formattedTotal}`;
};


/**
 * BÀI 3: TÍNH THUẾ THU NHẬP CÁ NHÂN
 */
document.getElementById("btnTax").onclick = function () {
    // 1. Input
    let name = document.getElementById("inputTaxName").value;
    let totalIncome = Number(document.getElementById("inputSalary").value);
    let dependents = Number(document.getElementById("inputDependents").value);
    let txtTax = document.getElementById("txtTax");

    // 2. Logic
    // Thu nhập chịu thuế = Tổng thu nhập - 4 triệu - (Số người phụ thuộc * 1.6 triệu)
    let taxableIncome = totalIncome - 4000000 - (dependents * 1600000);
    let taxAmount = 0;

    if (taxableIncome <= 0) {
        txtTax.innerHTML = `Họ tên: ${name}; Số tiền thuế phải nộp: 0 VND (Chưa đến mức phải nộp thuế)`;
        return;
    }

    // Tính phần trăm dựa theo thu nhập chịu thuế rơi vào mốc nào
    if (taxableIncome <= 60000000) {
        taxAmount = taxableIncome * 0.05;
    } else if (taxableIncome <= 120000000) {
        taxAmount = taxableIncome * 0.10;
    } else if (taxableIncome <= 210000000) {
        taxAmount = taxableIncome * 0.15;
    } else if (taxableIncome <= 384000000) {
        taxAmount = taxableIncome * 0.20;
    } else if (taxableIncome <= 624000000) {
        taxAmount = taxableIncome * 0.25;
    } else if (taxableIncome <= 960000000) {
        taxAmount = taxableIncome * 0.30;
    } else {
        taxAmount = taxableIncome * 0.35;
    }

    // 3. Output
    let formattedTax = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(taxAmount);
    txtTax.innerHTML = `Họ tên: ${name}; Tiền thuế thu nhập cá nhân: ${formattedTax}`;
};


/**
 * BÀI 4: TÍNH TIỀN CÁP
 */

function toggleConnectInput() {
    let customerType = document.getElementById("selCustomer").value;
    let divConnect = document.getElementById("divConnect");

    if (customerType === "company") {
        divConnect.style.display = "block"; 
    } else {
        divConnect.style.display = "none";  
    }
}

document.getElementById("btnNet").onclick = function () {
    // 1. Input
    let customerType = document.getElementById("selCustomer").value;
    let customerID = document.getElementById("inputCustomerID").value;
    let channels = Number(document.getElementById("inputChannel").value);
    let connections = Number(document.getElementById("inputConnect").value);
    let txtNet = document.getElementById("txtNet");
    let totalBill = 0;

    if (customerType === "") {
        txtNet.innerHTML = "Vui lòng chọn loại khách hàng!";
        return;
    }

    // 2. Logic
    if (customerType === "user") {
        // Phí hóa đơn (4.5) + Dịch vụ cơ bản (20.5) + Thuê kênh (7.5 * số kênh)
        totalBill = 4.5 + 20.5 + (channels * 7.5);
    } else if (customerType === "company") {
        let baseServiceFee = 0;
        // 10 kết nối đầu = 75$. Từ kết nối 11 trở đi cộng 5$ mỗi kết nối
        if (connections <= 10) {
            baseServiceFee = 75;
        } else {
            baseServiceFee = 75 + ((connections - 10) * 5);
        }
        
        // Phí hóa đơn (15) + Dịch vụ cơ bản + Thuê kênh (50 * số kênh)
        totalBill = 15 + baseServiceFee + (channels * 50);
    }

    // 3. Output
    let formattedBill = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(totalBill);
    txtNet.innerHTML = `Mã khách hàng: ${customerID}; Tiền cáp: ${formattedBill}`;
};