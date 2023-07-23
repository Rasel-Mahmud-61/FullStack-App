<?php
echo "PHP script is executing!";
$email = $_POST['email'];
$password = $_POST['password'];

// Database connection
$conn = new mysqli('localhost', 'rasel', 's83w10e61', 'web_dbms');
if ($conn->connect_error) {
    echo "$conn->connect_error";
    die("Connection Failed: " . $conn->connect_error);
} else {
    $stmt = $conn->prepare("INSERT INTO users (email, password) VALUES (?, ?)");
    $stmt->bind_param("si", $email, $password); // Use "ss" for two string parameters
    $execval = $stmt->execute();
    if ($execval) {
        echo "Registration successfully...";
    } else {
        echo "Error: " . $conn->error;
    }
    $stmt->close();
    $conn->close();
}
?>
