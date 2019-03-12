const scrapeParams = [
	{
		name: 'walmart',
		url: 'https://super.walmart.com.mx/productos?No=0&Nrpp=60&Ntt=',
		titleClass: '._2gokS300FwkmwCmngQmkQW a ._3RwjlfvJtz6NfVmm6CO363',
		priceClass: '._2gokS300FwkmwCmngQmkQW .wKmucxCRgoQZshD8qRUcV ._3URSxitsrGAcwITNRI6nvM',
		unencodedURI: false
	},
	{
		name: 'amazonMx',
		url: 'https://www.amazon.com.mx/s?k=',
		titleClass: '.s-result-list [data-index] .a-link-normal .a-size-base-plus.a-color-base.a-text-normal',
		priceClass: '.s-result-list [data-index] .sg-col-inner .a-offscreen',
		unencodedURI: true
	},
	{
		name: 'soriana',
		url: 'https://www.soriana.com/soriana/es/search/?text=',
		titleClass: '.product-productNameCont .name',
		priceClass: '.priceContainer .price',
		unencodedURI: true
	},
	{
		name: 'chedraui',
		url: 'https://www.chedraui.com.mx/search?text=',
		titleClass: '.product-item .plp-grid-word-break .name',
		priceClass: '.product-item .product__list--price-panel .product__listing--price',
		unencodedURI: false
	},
	{
		name: 'superama',
		url: 'https://www.superama.com.mx/buscar/',
		titleClass: '#resultadoProductosBusqueda .isotope-item .itemGrid .upcName .nombreProductoDisplay',
		priceClass: '#resultadoProductosBusqueda .isotope-item .itemGrid .upcPrice',
		unencodedURI: false
	}
];

module.exports = scrapeParams;