<?php
 
  $message = $_POST['m'];

  $time = time();

  $openFile = fopen("log/feedback.log", "a") or die("Unable to open file!");

  $log = $message . ', time =' . $time . "\n";

  fwrite($openFile, $log);

  fclose($openFile);