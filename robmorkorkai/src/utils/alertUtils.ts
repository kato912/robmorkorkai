import Swal from "sweetalert2";

// กำหนดสีหลักให้เหมือนกันทั้งเว็บ
const COLORS = {
    primary: "#0d6efd",
    danger: "#dc3545",
    success: "#198754",
    text: "#333"
};

export const AlertUtils = {
    // success alert
    success: (title: string, text: string = "") => {
        return Swal.fire({
            icon: 'success',
            title: title,
            text: text,
            confirmButtonColor: COLORS.primary,
            timer: 1500,
            showConfirmButton: false
        });
    },

    // error alert
    error: (title: string, text: string = "เกิดข้อผิดพลาด กรุณาลองใหม่") => {
        return Swal.fire({
            icon: 'error',
            title: title,
            text: text,
            confirmButtonColor: COLORS.primary
        });
    },

    // comfirm alert
    confirm: async (title: string, text: string, confirmText: string = "ยืนยัน", cancelText: string = "ยกเลิก") => {
        const result = await Swal.fire({
            title: title,
            text: text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: COLORS.danger,
            cancelButtonColor: '#6c757d',
            confirmButtonText: confirmText,
            cancelButtonText: cancelText,
            reverseButtons: true // สลับปุ่มให้กดยากขึ้นนิดนึงกันพลาด
        });
        return result.isConfirmed;
    },

    // 4. Loading alert
    loading: (title: string = "กำลังประมวลผล...") => {
        Swal.fire({
            title: title,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
    },

    // close alert
    close: () => {
        Swal.close();
    }
};