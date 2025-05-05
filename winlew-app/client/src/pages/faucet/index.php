<?php
require 'includes/session.php';
require 'includes/functions.php';
?>
<!DOCTYPE html>
<html>
<head><link rel='stylesheet' href='assets/style.css'></head>
<body>
<h1>Welcome to WinLEW Faucet</h1>
<p>Your balance: <?php echo get_balance($_SESSION['user_id']); ?> WinLEW</p>
<a href='claim.php'>Roll to Win</a>
</body>
</html>