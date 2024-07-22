<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Pastikan jalur ini benar

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $message = $_POST['message'];

    $mail = new PHPMailer(true);

    try {
        // Pengaturan server email
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com'; // Ganti dengan host SMTP Anda
        $mail->SMTPAuth = true;
        $mail->Username = 'chairulnurinsan@gmail.com'; // Ganti dengan username email Anda
        $mail->Password = 'hyos zrsc dfym upgq'; // Ganti dengan password email Anda
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Pengaturan email pengirim dan penerima
        $mail->setFrom('chairulnurinsan@gmail.com', 'Chairul'); // Ganti dengan email dan nama Anda
        $mail->addAddress('chairulnurinsan@gmail.com'); // Ganti dengan alamat email penerima

        // Konten email
        $mail->isHTML(true);
        $mail->Subject = 'Kritik dan Saran dari Pengguna';
        $mail->Body    = "<p><strong>Email:</strong> $email</p><p><strong>Kritik dan Saran:</strong><br>" . nl2br($message) . "</p>";
        $mail->AltBody = "Email: $email\nKritik dan Saran:\n$message";

        $mail->send();
        echo 'Pesan berhasil dikirim.';
    } catch (Exception $e) {
        echo "Pesan tidak dapat dikirim. Error: {$mail->ErrorInfo}";
    }
} else {
    echo 'Invalid request method';
}
?>
