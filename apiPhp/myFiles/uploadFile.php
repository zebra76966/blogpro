<?php
header("Access-Control-Allow-Origin: *");
header("Acess-Control-Allow-Origin: *");
require 'jwt.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

if($_GET['token']){
  try {
      $uToken=$_GET['token'];
      $deco=(array)JWT::decode($uToken, new Key($privateKey, 'HS256'));
      $exp=$deco['exp'];
      if($exp<=time()){
        echo "Expired" ;
      }
// INSERT TO DB START=======>
      else{
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
          if(strlen($_POST['batchName'])!=0||strlen($_POST['CourseName'])!=0){
  // FILES CHECK=====>
            $email=$deco['umail'];
            $batch=mysqli_real_escape_string($conn,$_POST['batchName']);
            $course=mysqli_real_escape_string($conn,$_POST['CourseName']);
            $Fuser=mysqli_fetch_array(mysqli_query($conn,"SELECT username FROM usercred WHERE email='$email'"),MYSQLI_ASSOC);
            $username=$Fuser['username'];
            $filename = $_FILES["userFile"]["name"];
            $check=mysqli_query($conn,"SELECT * FROM userdata WHERE filename='$filename'");
            if(mysqli_num_rows($check)>0){
                echo "File with this name already exists. Try Changing the file Name.";
              }
            else{
              date_default_timezone_set("Asia/Calcutta");
              $cTime=date("Y-m-d h:i:sa");

              $file_tmp_name = $_FILES["userFile"]["tmp_name"];
              $filetype = $_FILES["userFile"]["type"];
              $filepath = "/home/vol9_7/epizy.com/epiz_26606400/htdocs/apiFiles/".$filename;
              if($filetype=="application/pdf"){

                $sql = "INSERT INTO userdata(name,course,batch,filename,Udate) VALUES('$username', '$course','$batch','$filename','$cTime')";
                if (mysqli_query($conn, $sql)) {
                  move_uploaded_file($file_tmp_name, $filepath);
                  $fsql=mysqli_query($conn,"SELECT * FROM userdata WHERE name='$username'");
                  $resdata=mysqli_fetch_all($fsql,MYSQLI_ASSOC);
                  $data=array(
                    'statusText' => "File Uploaded Successfully!",
                    'userData' => $resdata,
                    'rtoken' => auth($email)
                  );
                  header("HTTP/1.1 200 OK");
                  echo json_encode($data);
                } else {
                  echo "Error: " . $sql . mysqli_error($conn);
                }
              }
            }
            }
            else{
              echo("error");
            }
  // FILES CHECK END
      }
    }
  catch(Exception $e) {
        echo $e->getMessage();
      }
    }
else{
  echo "error";
}


 ?>
