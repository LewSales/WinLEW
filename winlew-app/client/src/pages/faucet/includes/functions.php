<?php
function get_balance($user_id) {
  global $mysqli;
  $stmt = $mysqli->prepare('SELECT balance FROM users WHERE id = ?');
  $stmt->bind_param('i', $user_id);
  $stmt->execute();
  $stmt->bind_result($balance);
  $stmt->fetch();
  return $balance;
}
?>