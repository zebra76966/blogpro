<?php

  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Headers: *");

  if($_SERVER['HTTP_ORIGIN']=='https://blogpro-sooty.vercel.app'){
  header("HTTP/1.1 200 OK");
  require '/storage/ssd3/792/20016792/public_html/apiPhp/myFiles/jwt.php';
  $localhost='localhost';
  $user='id20016792_epiz_26606400';
  $pass='R6u+GX|-Bu+0_6gW';
  $db='id20016792_epiz_26606400_apifiles';

  $conn = mysqli_connect($localhost, $user, $pass);
  $db = mysqli_select_db($conn, $db);
  if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
    exit();
  }
  // SIGNIN AND AUTH/token
  if(strlen($_POST['upw'])!=0||strlen($_POST['uemail'])!=0){

  $email=mysqli_real_escape_string($conn,$_POST['uemail']);
  $pass=hash('sha256',mysqli_real_escape_string($conn,$_POST['upw']));
  $check=mysqli_query($conn,"SELECT * FROM usercred WHERE email='$email' AND password='$pass'");
  if(mysqli_num_rows($check)>0){
    $rUid=auth($email);
    echo json_encode($rUid);
    }
  else{
        echo "Email or Password doesn't exist or incorrect";
      }
  }
    else{
      echo"404";
    }
  }
  else{
      echo "You are not authorized";
  }

?>
