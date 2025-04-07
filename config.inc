<?php
/* Servers configuration */
$i = 0;

/* Server 1 */
$i++;
$cfg['Servers'][$i]['auth_type'] = 'cookie';
$cfg['Servers'][$i]['host'] = 'localhost'; // Your database host
$cfg['Servers'][$i]['port'] = '3306'; // Your database port
$cfg['Servers'][$i]['compress'] = false;
$cfg['Servers'][$i]['AllowNoPassword'] = false;

/* End of servers configuration */

$cfg['blowfish_secret'] = ''; // Add a random string here for security
$cfg['DefaultLang'] = 'en';
$cfg['ServerDefault'] = 1;
$cfg['UploadDir'] = '';
$cfg['SaveDir'] = '';
?>
