<?php

$remoteURL = 'apiFiles/'.$_GET['file'];

// Force download
header("Content-type: application/x-file-to-save");
header("Content-Disposition: attachment; filename=".basename($remoteURL));
ob_end_clean();
readfile($remoteURL);
exit;
?>
