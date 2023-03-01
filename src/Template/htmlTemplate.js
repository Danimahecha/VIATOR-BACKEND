const {user} = require('../db.js');


const htmlTemplate = `<!doctype html><html ⚡4email data-css-strict><head><meta charset="utf-8"><style amp4email-boilerplate>body{visibility:hidden}</style><script async src="https://cdn.ampproject.org/v0.js"></script><style amp-custom>.es-desk-hidden { display:none; float:left; overflow:hidden; width:0; max-height:0; line-height:0;}body { width:100%; font-family:Imprima, Arial, sans-serif;}table { border-collapse:collapse; border-spacing:0px;}table td, body, .es-wrapper { padding:0; Margin:0;}.es-content, .es-header, .es-footer { table-layout:fixed; width:100%;}p, hr { Margin:0;}h1, h2, h3, h4, h5 { Margin:0; line-height:120%; font-family:Imprima, Arial, sans-serif;}.es-left { float:left;}.es-right { float:right;}.es-p5 { padding:5px;}.es-p5t { padding-top:5px;}.es-p5b { padding-bottom:5px;}.es-p5l { padding-left:5px;}.es-p5r { padding-right:5px;}.es-p10 { padding:10px;}.es-p10t { padding-top:10px;}.es-p10b { padding-bottom:10px;}.es-p10l { padding-left:10px;}.es-p10r { padding-right:10px;}.es-p15 { padding:15px;}.es-p15t { padding-top:15px;}.es-p15b { padding-bottom:15px;}.es-p15l { padding-left:15px;}.es-p15r { padding-right:15px;}.es-p20 { padding:20px;}.es-p20t { padding-top:20px;}.es-p20b { padding-bottom:20px;}.es-p20l { padding-left:20px;}.es-p20r { padding-right:20px;}.es-p25 { padding:25px;}.es-p25t { padding-top:25px;}.es-p25b { padding-bottom:25px;}.es-p25l { padding-left:25px;}.es-p25r { padding-right:25px;}.es-p30 { padding:30px;}.es-p30t { padding-top:30px;}.es-p30b { padding-bottom:30px;}.es-p30l { padding-left:30px;}.es-p30r { padding-right:30px;}.es-p35 { padding:35px;}.es-p35t { padding-top:35px;}.es-p35b { padding-bottom:35px;}.es-p35l { padding-left:35px;}.es-p35r { padding-right:35px;}.es-p40 { padding:40px;}.es-p40t { padding-top:40px;}.es-p40b { padding-bottom:40px;}.es-p40l { padding-left:40px;}.es-p40r { padding-right:40px;}.es-menu td { border:0;}s { text-decoration:line-through;}p, ul li, ol li { font-family:Imprima, Arial, sans-serif; line-height:150%;}ul li, ol li { Margin-bottom:15px; margin-left:0;}a { text-decoration:underline;}.es-menu td a { text-decoration:none; display:block; font-family:Imprima, Arial, sans-serif;}.es-menu amp-img, .es-button amp-img { vertical-align:middle;}.es-wrapper { width:100%; height:100%;}.es-wrapper-color, .es-wrapper { background-color:#FFFFFF;}.es-header { background-color:transparent;}.es-header-body { background-color:#EFEFEF;}.es-header-body p, .es-header-body ul li, .es-header-body ol li { color:#2D3142; font-size:14px;}.es-header-body a { color:#2D3142; font-size:14px;}.es-content-body { background-color:#EFEFEF;}.es-content-body p, .es-content-body ul li, .es-content-body ol li { color:#2D3142; font-size:18px;}.es-content-body a { color:#2D3142; font-size:18px;}.es-footer { background-color:transparent;}.es-footer-body { background-color:#FFFFFF;}.es-footer-body p, .es-footer-body ul li, .es-footer-body ol li { color:#2D3142; font-size:14px;}.es-footer-body a { color:#2D3142; font-size:14px;}.es-infoblock, .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li { line-height:120%; font-size:12px; color:#CCCCCC;}.es-infoblock a { font-size:12px; color:#CCCCCC;}h1 { font-size:48px; font-style:normal; font-weight:bold; color:#2D3142;}h2 { font-size:36px; font-style:normal; font-weight:bold; color:#2D3142;}h3 { font-size:28px; font-style:normal; font-weight:bold; color:#2D3142;}.es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:48px;}.es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:36px;}.es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:28px;}a.es-button, button.es-button { border-style:solid; border-color:#4114F7; border-width:15px 20px 15px 20px; display:inline-block; background:#4114F7; border-radius:30px; font-size:22px; font-family:Imprima, Arial, sans-serif; font-weight:bold; font-style:normal; line-height:120%; color:#FFFFFF; text-decoration:none; width:auto; text-align:center;}.es-button-border { border-style:solid solid solid solid; border-color:#2CB543 #2CB543 #2CB543 #2CB543; background:#4114F7; border-width:0px 0px 0px 0px; display:inline-block; border-radius:30px; width:auto;}body { font-family:arial, "helvetica neue", helvetica, sans-serif;}.es-p-default { padding-top:20px; padding-right:40px; padding-bottom:0px; padding-left:40px;}.es-p-all-default { padding:0px;}@media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150% } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120% } h1 { font-size:30px; text-align:left } h2 { font-size:24px; text-align:left } h3 { font-size:20px; text-align:left } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:30px; text-align:left } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:24px; text-align:left } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px; text-align:left } .es-menu td a { font-size:14px } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:14px } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:14px } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:14px } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px } *[class="gmail-fix"] { display:none } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left } .es-m-txt-r amp-img { float:right } .es-m-txt-c amp-img { margin:0 auto } .es-m-txt-l amp-img { float:left } .es-button-border { display:block } a.es-button, button.es-button { font-size:18px; display:block; border-right-width:0px; border-left-width:0px; border-top-width:15px; border-bottom-width:15px } .es-adaptive table, .es-left, .es-right { width:100% } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%; max-width:600px } .es-adapt-td { display:block; width:100% } .adapt-img { width:100%; height:auto } td.es-m-p0 { padding:0px } td.es-m-p0r { padding-right:0px } td.es-m-p0l { padding-left:0px } td.es-m-p0t { padding-top:0px } td.es-m-p0b { padding-bottom:0 } td.es-m-p20b { padding-bottom:20px } .es-mobile-hidden, .es-hidden { display:none } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto; overflow:visible; float:none; max-height:inherit; line-height:inherit } tr.es-desk-hidden { display:table-row } table.es-desk-hidden { display:table } td.es-desk-menu-hidden { display:table-cell } .es-menu td { width:1% } table.es-table-not-adapt, .esd-block-html table { width:auto } table.es-social { display:inline-block } table.es-social td { display:inline-block } .es-desk-hidden { display:table-row; width:auto; overflow:visible; max-height:inherit } }</style></head>
<body><div class="es-wrapper-color"> <!--[if gte mso 9]><v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t"> <v:fill type="tile" color="#ffffff"></v:fill> </v:background><![endif]--><table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0"><tr><td valign="top"><table class="es-content" cellspacing="0" cellpadding="0" align="center"><tr><td align="center"><table class="es-content-body" style="border-radius: 20px 20px 0 0 " width="600" cellspacing="0" cellpadding="0" bgcolor="#efefef" align="center"><tr><td class="es-p40t es-p40r es-p40l" align="left"><table width="100%" cellspacing="0" cellpadding="0"><tr><td width="520" valign="top" align="center"><table width="100%" cellspacing="0" cellpadding="0" role="presentation"><tr><td style="font-size: 0px" align="center"><a target="_blank" href="https://viator-frontend-git-deploy-code-zeal.vercel.app/"><amp-img src="https://dicblg.stripocdn.email/content/guids/CABINET_eac390024aeada58a869fb80601097c80136fb9a61c116f8b0aca62c7c58a6d4/images/viatorlogopng1.png" alt="Viator-logo" style="display: block;border-radius: 100px" title="Viator-logo" width="150" height="54"></amp-img></a></td>
</tr></table></td></tr></table></td></tr><tr><td class="es-p20t es-p40r es-p40l" align="left"><table width="100%" cellspacing="0" cellpadding="0"><tr><td width="520" valign="top" align="center"><table style="background-color: #fafafa;border-radius: 10px;border-collapse: separate" width="100%" cellspacing="0" cellpadding="0" bgcolor="#fafafa" role="presentation"><tr><td class="es-p20" align="left"><h3>Estimado/a, ${user }</h3><p><br></p><p>¡Bienvenido a nuestra página de vuelos! Nos complace mucho que te hayas registrado en nuestra plataforma. Ahora tendrás acceso a una amplia variedad de opciones de vuelos a través de nuestra página.</p><p><br></p><p>En nuestra página, podrás buscar y comparar vuelos de diferentes aerolíneas, fechas y destinos. Además, también podrás reservar tus vuelos de manera segura y sencilla. Te invitamos a explorar todas las opciones que nuestra página tiene para ofrecer.</p><p><br></p>
<p>En caso de que necesites ayuda en cualquier momento, no dudes en contactarnos. Nuestro equipo de soporte estará encantado de ayudarte en cualquier duda o pregunta que tengas.</p><p><br></p><p>¡Gracias por unirte a nuestra comunidad de viajeros! Esperamos que tengas una gran experiencia utilizando nuestra página.<br></p></td></tr></table></td></tr></table></td></tr></table></td>
</tr></table><table class="es-content" cellspacing="0" cellpadding="0" align="center"><tr><td align="center"><table class="es-content-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#efefef" align="center"><tr><td class="es-p30t es-p40b es-p40r es-p40l" align="left"><table width="100%" cellspacing="0" cellpadding="0"><tr><td width="520" valign="top" align="center"><table width="100%" cellspacing="0" cellpadding="0" role="presentation"><tr><td align="center"> <!--[if mso]><a href="https://viator-frontend-git-deploy-code-zeal.vercel.app/" target="_blank" hidden> <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" esdevVmlButton href="https://viator-frontend-git-deploy-code-zeal.vercel.app/" style="height:56px; v-text-anchor:middle; width:520px" arcsize="50%" stroke="f" fillcolor="#423fc5"> <w:anchorlock></w:anchorlock> <center style='color:#ffffff; font-family:Imprima, Arial, sans-serif; font-size:22px; font-weight:700; line-height:22px; mso-text-raise:1px'>¡Visítanos!</center> </v:roundrect></a><![endif]--> <!--[if !mso]><!-- --><span class="msohide es-button-border" style="display: block;background: #423fc5"><a href="https://viator-frontend-git-deploy-code-zeal.vercel.app/" class="es-button msohide" target="_blank" style="border-left-width: 5px;border-right-width: 5px;display: block;background: #423fc5;border-color: #423fc5">¡Visítanos!</a></span> <!--<![endif]--></td>
</tr></table></td></tr></table></td></tr><tr><td class="es-p40r es-p40l" align="left"><table width="100%" cellspacing="0" cellpadding="0"><tr><td width="520" valign="top" align="center"><table width="100%" cellspacing="0" cellpadding="0" role="presentation"><tr><td align="left"><p>Atentamente, <br></p><p><br></p><p>el equipo de Viator.<br></p></td></tr><tr><td class="es-p40t es-p20b" style="font-size:0" align="center"><table width="100%" cellspacing="0" cellpadding="0" border="0" role="presentation"><tr><td style="border-bottom: 1px solid #666666;background: unset;height: 1px;width: 100%;margin: 0px"></td></tr></table></td></tr></table></td>
</tr><tr><td width="47" valign="top" align="center"><table width="100%" cellspacing="0" cellpadding="0" role="presentation"><tr><td class="es-m-txt-l" style="font-size: 0px" align="center"><a target="_blank" href="https://viewstripo.email"><amp-img src="https://dicblg.stripocdn.email/content/guids/CABINET_eac390024aeada58a869fb80601097c80136fb9a61c116f8b0aca62c7c58a6d4/images/viatorlogopng.png" alt="Demo" style="display: block" title="Demo" width="47" height="47"></amp-img></a></td></tr></table></td></tr></table></td></tr></table></td></tr></table></td></tr></table></div></body></html>
`

module.exports= htmlTemplate;