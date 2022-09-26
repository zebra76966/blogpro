<?php
  require $_SERVER['DOCUMENT_ROOT'].'/apiPhp/vendor/autoload.php';
  use Firebase\JWT\JWT;
  use Firebase\JWT\Key;

  $privateKey='Randomrohit';
  //Replace this with SHA256 OR 512

if($_GET['token']!==''){

  echo 'ok';

}


function auth($uemail){
  $key='Randomrohit';
    $iat=time();

    $exp=$iat+800*60;
    $payload = array(
      'iss' => 'http://localhost:8080/apiPhp/',
      'aud' => 'http://localhost:3000',
      'umail' => $uemail,
      'iat' => $iat,
      'exp' => $exp
    );

    $jwt = JWT::encode($payload, $key, 'HS256');
    return array(
      'token'=>$jwt,
      'expires'=>$exp,
      'user-email'=>$uemail
    );
  }

  $done=auth();

  echo json_encode($done);
  // echo '<br>'.time();
  $try="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvYXBpUGhwLyIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzAwMCIsImlhdCI6MTY2Mzg2OTcyMywiZXhwIjoxNjYzODcwMjAwfQ.ZzBGl9z6NBCrAIOJkyr6DioW_n1lC5MopTtfUhlD6Bk";

  try {
        $deco=(array)JWT::decode($try, new Key($privateKey, 'HS256'));
        $exp=$deco['exp'];
        if($exp<=time()){
          echo "<p style='color:red;'>Expired</p>" ;
        }
        else{
          echo "<p style='color:green;'>Signature Verified</p>";
        }
      }
  catch(Exception $e) {
        echo "<p style='color:red;'>" .$e->getMessage();
      }


  // echo 'working';

 ?>
