#!/bin/bash

# Backend Environment Variables Setup Script
# Generated from Vly for Git Sync
# Run this script to set up your Convex backend environment variables

echo 'Setting up Convex backend environment variables...'

# Check if Convex CLI is installed
if ! command -v npx &> /dev/null; then
    echo 'Error: npx is not installed. Please install Node.js and npm first.'
    exit 1
fi

echo "Setting JWKS..."
npx convex env set "JWKS" -- "{\"keys\":[{\"use\":\"sig\",\"kty\":\"RSA\",\"n\":\"oF7g8zZ8jYF2jXOBvrNYnms1W3JxwQCtxzWl94cph0szuky2gDAWOgeu3bOc2f16P3-g9XmVNLozLI6qrcpzggHsmKU9y-yeML9_bcJ8nP64FBulJ24NPgK70QlkCit6ooFxwFPQpmSHCR9mPkSfW6ZUTMAc3zVBm_bh326skAkW2U04L5oFRzMvrlvfUnHNncoYfY02CYJht6oLSUcgXMvMac8WweO6PTuLbHM3f_mIuQWTwhOVC94d49G476f23bY65a4nd7eZgDsJa_swtO8JkSwWIqdKtoD3_JuuOvxrBKhjBTiCXemsXwFafCVUcKpSkQP1LORfl1ZeKuhDZw\",\"e\":\"AQAB\"}]}"

echo "Setting JWT_PRIVATE_KEY..."
npx convex env set "JWT_PRIVATE_KEY" -- "-----BEGIN PRIVATE KEY----- MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCgXuDzNnyNgXaN c4G+s1ieazVbcnHBAK3HNaX3hymHSzO6TLaAMBY6B67ds5zZ/Xo/f6D1eZU0ujMs jqqtynOCAeyYpT3L7J4wv39twnyc/rgUG6Unbg0+ArvRCWQKK3qigXHAU9CmZIcJ H2Y+RJ9bplRMwBzfNUGb9uHfbqyQCRbZTTgvmgVHMy+uW99Scc2dyhh9jTYJgmG3 qgtJRyBcy8xpzxbB47o9O4tsczd/+Yi5BZPCE5UL3h3j0bjvp/bdtjrlrid3t5mA Owlr+zC07wmRLBYip0q2gPf8m646/GsEqGMFOIJd6axfAVp8JVRwqlKRA/Us5F+X Vl4q6ENnAgMBAAECggEARD5ryoOuuAbWHLaBCVZHiU6E66/FUYTI7oNZZ36ogO7T Cd3YMa+E3dfkJWrn/em8SmY06BD/mer8mOLzJbaHtdS8ym5S4EMGRCdRgjMnlSVd zwy+mItf7jn6k6dD34IGEz4zWk0wdoZD4nFusGPCTp12tRxxjNicXVLPZqWxoC7Z WRnrRvA0L63bQEBGXKjlJInOubVnduqkqn2QHsRJBx5KN/oz6MdStisk/4Ftlf67 eR+5PqYosPOZco+GW7b6Y7HRCo/QteKsimFYPy74S9YuQoAPmEwq7Ei1BlVxJ5pM FhVFrLhDb+iGFfbmx6X182LmZEHWXXFo701gHHylGQKBgQDUmiS+lcIKSjuS5y07 iVK2t+pyquRsXwi24Na+JF8W/RYdD8RdjgsndHxqqpqX6bDqwxOmZCbuQ+rlMnmw q3UVq+GkU4KnKSO0sulO3dMWl3tzuxkgWqAjyDXzK6sIzjNiMwOZ4HfzOVFrhxDP v6lLjWZ7ZV9a+2nGEMw5MngZKQKBgQDBG0vZVsPq7N28fe9RtWIjPq9UWdMwwca1 mc2b7ZLivRWXy37bmRML2yg/wTRNSiybOgEDyMAtv9/Gmt94fLHnRRPn1Adnvt7Z Upr4V3a29MvNmqTD1TiO6A3vqW6hDh0nIDdWVQgoOMkDrmOeDJ5Z3YZPh4uOH9aQ lAj8fr+6DwKBgQCLpCtaWzc2VwfGN73ICyyfAzIk2wZqAAnTRN8HyRAEI3vw3rhV 0sSUx7gov6IHAeHIcRVpBwNjII0augqf9h5Te7AbpRZ+AVGIkLMZsC3D+v+FRnD8 hUoF9q0o6ZfPktDBQUyuN3fR8+X8wJxUOElUbK3RgwYc1mHlTIc3UmT78QKBgB/l a1Td4QSH1WRSBNqhNDGQJBOxtpGCIFlUq0KLLkznYI6vHSgWk6/MpkxJlGMD0nRd U1eVrDCiVcsPP8Q+DICfx1bujb6UJ2kMHO7SO5iivJscZQS3zlzEdbDVcqGFnEkf KCTJbMx//Kvv/SJZATrkvU+bmvCBz8YXvZg/M1n/AoGABZMind4zWLugy7UU/iP6 mf2Gc9ZETvNUNYSGxeoLuvZ+5/jWKha0MdId+ywbfhANhW14rIlkqgXizjWPpKkm ggDeaS3ivH/WbwNr2pRSQkwwHyqdQVetGODSWnfkErh3uPzEP9VP64ZKGv+yJJZj yUgO7HouunO/yR/QAUDxx1o"

echo "Setting SITE_URL..."
npx convex env set "SITE_URL" -- "http://localhost:5173"

echo "Setting VLY_APP_NAME..."
npx convex env set "VLY_APP_NAME" -- "Vate Glow"

echo "✅ All backend environment variables have been set!"
echo "You can now run: pnpm dev:backend"
