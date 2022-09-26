<?php
header('Access-Control-Allow-Origin: *');
if($_SERVER['HTTP_ORIGIN']=='https://blogpro-sooty.vercel.app'){

$localhost = 'sql102.epizy.com';
$user = 'epiz_26606400';
$pass = 'eDue62fM8p9Eg';
$db = 'epiz_26606400_apiFiles';

$conn = mysqli_connect($localhost, $user, $pass);
$db = mysqli_select_db($conn, $db);
if (mysqli_connect_errno()) {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  exit();
}
// ONLY REGISTER DATA
if(strlen($_POST['uname'])!=0||strlen($_POST['email'])!=0){
$username=mysqli_real_escape_string($conn,$_POST['uname']);
$email=mysqli_real_escape_string($conn,$_POST['uemail']);
$pass=hash('sha256',mysqli_real_escape_string($conn,$_POST['upw']));
$check=mysqli_query($conn,"SELECT * FROM usercred WHERE email='$email'");
if(mysqli_num_rows($check)>0){
    echo "This Email already exists. Try Again";
  }
else{
      $sql = "INSERT INTO usercred(username,email,password) VALUES('$username', '$email','$pass')";
      if (mysqli_query($conn, $sql)) {

        header("HTTP/1.1 200 OK");
        echo "Success! You are now registered";
      } else {
        echo "Error: Something went Wrong";
      }
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
