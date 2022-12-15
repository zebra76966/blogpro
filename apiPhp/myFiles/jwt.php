<?php
  require '/storage/ssd3/792/20016792/public_html/apiPhp/myFiles/vendor/autoload.php';
  use Firebase\JWT\JWT;
  use Firebase\JWT\Key;

  $privateKey='Randomrohit';
//   //Replace this with SHA256 OR 512


function auth($uemail){
  $key='Randomrohit';
    $iat=time();

    $exp=$iat+60*60;
    $payload = array(
      'iss' => 'https://zebra.42web.io',
      'aud' => 'https://blogpro-sooty.vercel.app',
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

 ?>
