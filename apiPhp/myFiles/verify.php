<?php
header("Access-Control-Allow-Origin: *");
header("Acess-Control-Allow-Origin: *");

require '/storage/ssd3/792/20016792/public_html/apiPhp/myFiles/jwt.php';
  use Firebase\JWT\JWT;
  use Firebase\JWT\Key;
//Replace this with SHA256 OR 512

if($_GET['token']){
  try {
      $uToken=$_GET['token'];
      $deco=(array)JWT::decode($uToken, new Key($privateKey, 'HS256'));
      $exp=$deco['exp'];
      if($exp<=time()){
        echo "Expired";
      }
      else{
        $rToken=auth($deco['umail']);
        echo json_encode($rToken);
        // echo "Signature Verified";
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
