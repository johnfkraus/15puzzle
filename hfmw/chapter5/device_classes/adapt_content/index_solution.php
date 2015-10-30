<?php require_once('device_classes.php'); ?>
<?php if($device_class == 'simpler_mobile'): ?>
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML Basic 1.1//EN" "http://www.w3.org/TR/xhtml-basic/xhtml-basic11.dtd">
<?php else: ?>
  <!DOCTYPE html>
<?php endif; ?>
<html>
<head>
  <title>AcedIt! Study Aids</title>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> 
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
  <link rel="stylesheet" type="text/css" href="styles/common.css" />
  <?php if ($device_class == 'desktop' || $device_class == 'tablet' || $device_class == 'unsupported'): ?>
    <link rel="stylesheet" type="text/css" href="styles/desktop.css" />
  <?php endif; ?>
  <?php if ($device_class == 'higher_mobile' || $device_class == 'simpler_mobile'): ?>
    <link rel="stylesheet" type="text/css" href="styles/mobile.css" />
  <?php endif; ?>
  <?php if ($device_class == 'higher_mobile'): ?>
    <link rel="stylesheet" type="text/css" href="styles/mwebkit.css" />
  <?php endif; ?>
</head>
<body>

<div id="header">
  <h1>AcedIt! Study Aids</h1>
</div>
<?php if ($device_class == 'desktop' || $device_class == 'tablet' || $device_class == 'unsupported'): ?>
  <div id="navigation">
    <ul>
      <li><a href="#">Home</a></li>
      <?php if ($device_class != 'unsupported'): ?>
        <li><a href="#">Shop Online</a></li>
        <li><a href="#">Study Now!</a></li>
      <?php endif; ?>
      <li><a href="#">Contact Us</a></li>
      <li><a href="#">FAQ</a></li>
    </ul>
  </div>
<?php endif; ?>
<div class="row">
<div id="intro">
<p>Morbi non erat non ipsum pharetra tempus. Donec orci. Proin in ante. Pellentesque sit amet purus. Cras egestas diam sed ante. Etiam imperdiet urna sit amet risus. Donec ornare arcu id erat. Aliquam ultrices scelerisque sem. In elit nulla, molestie vel, ornare sit amet, interdum vel, mauris. Etiam dignissim imperdiet metus.</p>
</div>
<div id="feature">
  <div id="featured_product">
    <?php if ($device_class == 'desktop'): ?>
      <p>Featured product Flash slideshow.</p>
    <?php else: ?>
      <p>Static featured product image.</p>
    <?php endif; ?>
  </div>
</div>
<?php if ($device_class == 'desktop' || $device_class == 'tablet'): ?>
  <div id="ads">
    <h3>Lorem Ipsum</h3>
    <p>Donec ornare arcu id erat. Aliquam ultrices scelerisque sem.</p>
    
    <h3>Lorem Ipsum</h3>
    <p>Donec ornare arcu id erat. Aliquam ultrices scelerisque sem.</p>
  </div>
  </div>
  
  <div id="fromtheblog">
    <div class="blog_post"><h4>Banh mi before they sold out helvetica</h4>
    <p>Artisan master cleanse art party, aesthetic quinoa beard american apparel retro dreamcatcher twee. Seitan irony cliche retro biodiesel, trust fund dreamcatcher artisan VHS +1 beard.</p></div>
    <div class="blog_post"><h4>Trust fund vegan PBR </h4>
    <p>Aesthetic VHS art party, banksy craft beer fanny pack wolf american apparel lomo tofu photo booth skateboard locavore portland. Next level messenger bag +1, trust fund art party beard blog ethical Austin.</p></div>
    <div class="blog_post last"><h4>Locavore marfa fixie</h4>
    <p>Echo park williamsburg terry richardson, cred before they sold out stumptown readymade. Organic keytar readymade freegan 3 wolf moon, williamsburg viral banh mi next level aesthetic.</p></div>
  </div>
<?php else: ?>
</div>
<?php endif; ?>

<?php if ($device_class == 'higher_mobile' || $device_class == 'simpler_mobile'): ?>
  <div id="navigation">
    <ul>
      <li><a href="#">Home</a></li>
      <li><a href="#">Shop Online</a></li>
      <?php if ($device_class == 'higher_mobile'): ?>
        <li><a href="#">Study Now!</a></li>
      <?php endif; ?>
      <li><a href="#">Blog</a></li>
      <li><a href="#">Contact Us</a></li>
      <li><a href="#">FAQ</a></li>
    </ul>
  </div>
<?php endif; ?>

<div id="footer">
  <p class="attribution">Book photograph by <a href="http://www.flickr.com/photos/shutterhacks/">Shutterhacks</a></p>
  <p>Current device class: <?php print $device_class; ?></p>
</div>

</body>
</html>