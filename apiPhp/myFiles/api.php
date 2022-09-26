<?php
header('Access-Control-Allow-Origin: *');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
    header('Access-Control-Allow-Headers: token, Content-Type');
    header('Access-Control-Max-Age: 1728000');
    header('Content-Length: 0');
    header('Content-Type: text/plain');
    die();
}

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
echo 'connected';
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
// ONLY RESPONSE DATA
else{
  $sql = "SELECT * FROM userdata";
  if (mysqli_query($conn, $sql)) {
    $fsql=mysqli_query($conn,$sql);
    $resdata=mysqli_fetch_all($fsql,MYSQLI_ASSOC);
    echo json_encode($resdata);
    echo "lol";
    header("HTTP/1.1 200 OK");
  } else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
  }
}



// $username=mysqli_real_escape_string($conn,$_POST['username']);
// $phno=mysqli_real_escape_string($conn,$_POST['phone']);
//
// $filename = $_FILES["uimgs"]["name"];
// $file_tmp_name = $_FILES["uimgs"]["tmp_name"];
// $filetype = $_FILES["uimgs"]["type"];
// $filepath = "uimgs/" .$filename;
// $sfilepath="http://localhost:8080/api/".$filepath;
// if($username!==""&&$phno!=="" && $filetype=="image/jpeg"||$filetype=="application/pdf" || $filetype=="image/jpg" || $filetype=="image/png" || $filetype=="image/gif"){

  // echo("<h1 align='center'>username=".$username."</h1>");
  // echo("<h1 align='center'>phone=".$phno."</h1>");
//   $sql = "INSERT INTO userdata(name,ph, filename) VALUES('$username', '$phno','$filename')";
//   if (mysqli_query($conn, $sql)) {
//     move_uploaded_file($file_tmp_name, $filepath);
//     $fsql=mysqli_query($conn,"SELECT * FROM userdata");
//     $resdata=mysqli_fetch_all($fsql,MYSQLI_ASSOC);
//     header("HTTP/1.1 200 OK");
//     echo json_encode($resdata);
//   } else {
//     echo "Error: " . $sql . "<br>" . mysqli_error($conn);
//   }
// }
// else{
//   echo("error");
// }



?>
