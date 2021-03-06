/******************************************************************************
 *  Copyright 2019 ModusBox, Inc.                                             *
 *                                                                            *
 *  info@modusbox.com                                                         *
 *                                                                            *
 *  Licensed under the Apache License, Version 2.0 (the "License");           *
 *  you may not use this file except in compliance with the License.          *
 *  You may obtain a copy of the License at                                   *
 *  http://www.apache.org/licenses/LICENSE-2.0                                *
 *                                                                            *
 *  Unless required by applicable law or agreed to in writing, software       *
 *  distributed under the License is distributed on an "AS IS" BASIS,         *
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  *
 *  See the License for the specific language governing permissions and       *
 *  limitations under the License.                                            *
 ******************************************************************************/

const { createJwtStrategy } = require('../src/oauth/OAuthHelper');
const Constants = require('../src/constants/Constants');

const assert = require('chai').assert;

describe('JwtTokenVerifierTest tests', () => {

  before(() => {
  });

  after(() => {
  });

  beforeEach(() => {
    Constants.OAUTH.EMBEDDED_CERTIFICATE = null;
  });

  afterEach(() => {
  });

  it('should fail because of an invalid signature', async () => {
    let callbackCalled = false;

    let token = 'eyJ4NXQiOiJPRGMzTVRNeU1UaGxPRGc1WXpRM1pHTTVNek16TnpGaE5UVmtNVFEwWlRGaU5tVmlZMkk1WkEiLCJraWQiOiJPRGMzTVRNeU1UaGxPRGc1WXpRM1pHTTVNek16TnpGaE5UVmtNVFEwWlRGaU5tVmlZMkk1WkEiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJodWJfb3BlcmF0b3JAY2FyYm9uLnN1cGVyIiwiYXVkIjoiVE5TVnZFRUdPV1NwZ1VkSklwRThtUFVsS3dvYSIsIm5iZiI6MTU3ODU2NTc0NCwiYXpwIjoiVE5TVnZFRUdPV1NwZ1VkSklwRThtUFVsS3dvYSIsInNjb3BlIjoib3BlbmlkIiwiaXNzIjoiaHR0cHM6XC9cL2lza20ucHVibGljLnRpcHMtc2FuZGJveC5saXZlOjk0NDNcL29hdXRoMlwvdG9rZW4iLCJncm91cHMiOlsiSW50ZXJuYWxcL3N1YnNjcmliZXIiLCJBcHBsaWNhdGlvblwvTVRBIiwiQXBwbGljYXRpb25cL2h1Yl9vcGVyYXRvcl9yZXN0X2FwaV9zdG9yZSIsIkFwcGxpY2F0aW9uXC9QVEEiLCJJbnRlcm5hbFwvZXZlcnlvbmUiLCJBcHBsaWNhdGlvblwvTUNNX3BvcnRhbCIsIkFwcGxpY2F0aW9uXC9odWJfb3BlcmF0b3JfRGVmYXVsdEFwcGxpY2F0aW9uX1BST0RVQ1RJT04iXSwiZXhwIjoxNTc4NTY5MzQ0LCJpYXQiOjE1Nzg1NjU3NDQsImp0aSI6ImJlN2JiNDhkLWI1NTMtNGFmOS1hOTYyLWM5Yzk2NzM0Nzc1ZiJ9.wV6c-YdaGcdMmgfJ-w5XIyiHGNiipyPoX36nxRH7pY0dFwxM4Wz5zghgPgMrdiV2A4Q52_5XFojk0R8ZxGfqk5h-TEj-NpYw6mvyfimndFPk9kngSyZDhMsxRtS4UXWxQCMmiIUtAZfZkTGroFClBKeLE-hIBoxHhaFFiN6VLPXXfW3CzekSfRovVHIr1JxP-4fK2ixz5tcAdqVvGXYGUdHhagPtX7a4O4ohvRRF5NWfSZQEsABjaT26PfIwdBiiW8-FGzYCIJV6VavESuwlOv2N1eSPfl-l81yLK9tJiXbwh1Hs-yl9x-tP2Qb2iAP2vPUqYp4E4LoCbWPMm0i2Zg';
    let strategy = createJwtStrategy(tokenPropertyExtractor);
    strategy.fail = (err) => {
      assert.deepEqual(err.name, 'JsonWebTokenError');
      callbackCalled = true;
    };
    let req = {};
    req.token = token;
    strategy.authenticate(req, { session: false });
    assert.isTrue(callbackCalled, 'Should have throw a JsonWebTokenError: invalid signature');
  });

  it('should fail because expired', async () => {
    let callbackCalled = false;
    let token = 'eyJ4NXQiOiJOVEF4Wm1NeE5ETXlaRGczTVRVMVpHTTBNekV6T0RKaFpXSTRORE5sWkRVMU9HRmtOakZpTVEiLCJraWQiOiJOVEF4Wm1NeE5ETXlaRGczTVRVMVpHTTBNekV6T0RKaFpXSTRORE5sWkRVMU9HRmtOakZpTVEiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbkBjYXJib24uc3VwZXIiLCJhdWQiOiJxNl9UcUtZSzJmYWhHRXUwaVg3Uld4Y0huSmNhIiwibmJmIjoxNTc4NDEwMjQwLCJhenAiOiJxNl9UcUtZSzJmYWhHRXUwaVg3Uld4Y0huSmNhIiwic2NvcGUiOiJvcGVuaWQiLCJpc3MiOiJodHRwczpcL1wvZGV2aW50MXdzbzJpc2ttLmNhc2FodWIubGl2ZTo5NDQzXC9vYXV0aDJcL3Rva2VuIiwiZ3JvdXBzIjpbIkludGVybmFsXC9zdWJzY3JpYmVyIiwiQXBwbGljYXRpb25cL2FkbWluX3Jlc3RfYXBpX3N0b3JlX2FkbWluIiwiSW50ZXJuYWxcL2NyZWF0b3IiLCJBcHBsaWNhdGlvblwvbW93YWxpX2FkbWluX3BvcnRhbCIsIkludGVybmFsXC9wdWJsaXNoZXIiLCJBcHBsaWNhdGlvblwvYWRtaW5fcmVzdF9hcGlfc3RvcmUiLCJJbnRlcm5hbFwvZXZlcnlvbmUiLCJhZG1pbiIsIkFwcGxpY2F0aW9uXC9hZG1pbl9yZXN0X2FwaV9wdWJsaXNoZXIiLCJBcHBsaWNhdGlvblwvTUNNX3BvcnRhIl0sImV4cCI6MTU3ODQxMzg0MCwiaWF0IjoxNTc4NDEwMjQwLCJqdGkiOiI5YzdmODNiOS0wNTk4LTQzMTktOGMxMC04NThjNzY4ZjZmNzIifQ.ViU3b0BgYr6gHlalAWpykHSCYFOSb6t11CRBD50KbEMOnLqfD4ZGU-Jf1OK2d86OixzYLmIkun_apxZPW0HABGEPMhzkpNyTDadku-GZeXokgLMGobs7CrK6IJmnc3U-jADFypVFgCBbs77oaQ49p6oBWvzSme-1nzTBbwfyaC0Vb_kc7vbuBszA_nTpYF-utG_9R0-jkGzqazWR55sUshuODZSGlAQWYaBOmwboNPAibzot2cCSrvF1kd5Db7Nwah_Ei5oPyWqLnQ26MsUXmrl_zAxw3BCdZ9OqsQFcDRx8Fj5bfxoj4J8r82T6zshqoD4I8zM-XOFkFCS0bFgPAA';
    let strategy = createJwtStrategy(tokenPropertyExtractor);
    strategy.fail = (err) => {
      assert.deepEqual(err.name, 'TokenExpiredError');
      callbackCalled = true;
    };
    let req = {};
    req.token = token;
    strategy.authenticate(req, { session: false });
    assert.isTrue(callbackCalled, 'Should have throw a TokenExpiredError');
  });
});

it('should fail because it\'s expired and using a custom cert', async () => {
  let callbackCalled = false;

  let token = 'eyJ4NXQiOiJPRGMzTVRNeU1UaGxPRGc1WXpRM1pHTTVNek16TnpGaE5UVmtNVFEwWlRGaU5tVmlZMkk1WkEiLCJraWQiOiJPRGMzTVRNeU1UaGxPRGc1WXpRM1pHTTVNek16TnpGaE5UVmtNVFEwWlRGaU5tVmlZMkk1WkEiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJodWJfb3BlcmF0b3JAY2FyYm9uLnN1cGVyIiwiYXVkIjoiVE5TVnZFRUdPV1NwZ1VkSklwRThtUFVsS3dvYSIsIm5iZiI6MTU3ODU2NTc0NCwiYXpwIjoiVE5TVnZFRUdPV1NwZ1VkSklwRThtUFVsS3dvYSIsInNjb3BlIjoib3BlbmlkIiwiaXNzIjoiaHR0cHM6XC9cL2lza20ucHVibGljLnRpcHMtc2FuZGJveC5saXZlOjk0NDNcL29hdXRoMlwvdG9rZW4iLCJncm91cHMiOlsiSW50ZXJuYWxcL3N1YnNjcmliZXIiLCJBcHBsaWNhdGlvblwvTVRBIiwiQXBwbGljYXRpb25cL2h1Yl9vcGVyYXRvcl9yZXN0X2FwaV9zdG9yZSIsIkFwcGxpY2F0aW9uXC9QVEEiLCJJbnRlcm5hbFwvZXZlcnlvbmUiLCJBcHBsaWNhdGlvblwvTUNNX3BvcnRhbCIsIkFwcGxpY2F0aW9uXC9odWJfb3BlcmF0b3JfRGVmYXVsdEFwcGxpY2F0aW9uX1BST0RVQ1RJT04iXSwiZXhwIjoxNTc4NTY5MzQ0LCJpYXQiOjE1Nzg1NjU3NDQsImp0aSI6ImJlN2JiNDhkLWI1NTMtNGFmOS1hOTYyLWM5Yzk2NzM0Nzc1ZiJ9.wV6c-YdaGcdMmgfJ-w5XIyiHGNiipyPoX36nxRH7pY0dFwxM4Wz5zghgPgMrdiV2A4Q52_5XFojk0R8ZxGfqk5h-TEj-NpYw6mvyfimndFPk9kngSyZDhMsxRtS4UXWxQCMmiIUtAZfZkTGroFClBKeLE-hIBoxHhaFFiN6VLPXXfW3CzekSfRovVHIr1JxP-4fK2ixz5tcAdqVvGXYGUdHhagPtX7a4O4ohvRRF5NWfSZQEsABjaT26PfIwdBiiW8-FGzYCIJV6VavESuwlOv2N1eSPfl-l81yLK9tJiXbwh1Hs-yl9x-tP2Qb2iAP2vPUqYp4E4LoCbWPMm0i2Zg';

  Constants.OAUTH.EMBEDDED_CERTIFICATE = '-----BEGIN CERTIFICATE-----\nMIIFmjCCBIKgAwIBAgISA8BcoiclaPJ/UngflMyf7BYIMA0GCSqGSIb3DQEBCwUA\nMEoxCzAJBgNVBAYTAlVTMRYwFAYDVQQKEw1MZXQncyBFbmNyeXB0MSMwIQYDVQQD\nExpMZXQncyBFbmNyeXB0IEF1dGhvcml0eSBYMzAeFw0xOTEwMzExNDAxMTBaFw0y\nMDAxMjkxNDAxMTBaMCgxJjAkBgNVBAMTHWlza20ucHVibGljLnRpcHMtc2FuZGJv\neC5saXZlMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5sODbAwBiKE7\nx1cAkWOOCBdFMIhNbXo9CYYwI0/K5oAwZAHwMjGJQHIS+Ny2TMXWs4ESDJIQDv1g\nZhglmeUYp0PTOgWFeBB0oFg5VSSNr+EqhDdt3Qj8uscNtlCxDaX64mLATzHBWVha\nyoToJNcF2ONey//nTMsjDjf5o+i4GGleUEr0pqmYhUszBoAi6pmyOelliZ3oZeF5\naASpKUWyy+glin2g9EiSfF1kmap9XgTABAyttPqyJ/FZBNth04dv5SrwGaTKYd85\nAJQMvpmCyTSbLOlGV9W5IeKOszAm4WT4F+Dx3P2ZtPQKtY/ajpAw6jwZMAF+vZMJ\nW8TFZ5jkvQIDAQABo4ICmjCCApYwDgYDVR0PAQH/BAQDAgWgMB0GA1UdJQQWMBQG\nCCsGAQUFBwMBBggrBgEFBQcDAjAMBgNVHRMBAf8EAjAAMB0GA1UdDgQWBBT7VAhD\nNl7GXaFU7bnab1y43AnDfzAfBgNVHSMEGDAWgBSoSmpjBH3duubRObemRWXv86js\noTBvBggrBgEFBQcBAQRjMGEwLgYIKwYBBQUHMAGGImh0dHA6Ly9vY3NwLmludC14\nMy5sZXRzZW5jcnlwdC5vcmcwLwYIKwYBBQUHMAKGI2h0dHA6Ly9jZXJ0LmludC14\nMy5sZXRzZW5jcnlwdC5vcmcvMFAGA1UdEQRJMEeCHWlza20ucHVibGljLnRpcHMt\nc2FuZGJveC5saXZlgiZtb2phbG9vcC1pc2ttLnB1YmxpYy50aXBzLXNhbmRib3gu\nbGl2ZTBMBgNVHSAERTBDMAgGBmeBDAECATA3BgsrBgEEAYLfEwEBATAoMCYGCCsG\nAQUFBwIBFhpodHRwOi8vY3BzLmxldHNlbmNyeXB0Lm9yZzCCAQQGCisGAQQB1nkC\nBAIEgfUEgfIA8AB3AAe3XBvlfWj/8bDGHSMVx7rmV3xXlLdq7rxhOhpp06IcAAAB\nbiJVrfoAAAQDAEgwRgIhAKzaPtyoH4kd5T/z0jpYQRH71GlKLskw9F5lSp5QuBcd\nAiEA+Fe4n6+Vl2l40D4SeIS22Ugha2Ntgx2sZ294k30eNSYAdQBep3P531bA57U2\nSH3QSeAyepGaDIShEhKEGHWWgXFFWAAAAW4iVa/JAAAEAwBGMEQCIEPcCn1WO2ZO\n5HDxYudebn77YMcNn1N18r67R7KCaWQZAiBAWDT/2E+1s612D7cf89xo5ij60mLD\nmzj7Mw80qk+F8TANBgkqhkiG9w0BAQsFAAOCAQEAIb4u6mQ/maplSKly3VFUjKBs\nYavuJHQoAp1IFuVJzpF+8mSM7nistBtl/ODbiQs3G8wYLxLFbkeadFVf3xeVb0jl\nGM3c+w+AcwVGrSIACtlqmv75HxFIPp3lJ7vnywZwb7lTDPJ8XlvLk9TFRxeKfBrH\nK3t9dga6wxUXV8aIYoUHtfwL45CdYRoqcdZgMJeWIUJAYB+8On8eHuaLu1obrHcM\n5Odg6GdelqwkCCT/f17lNghsM1TUVQbmfIliSSW4VKpvIbrOLS1HJ6CuYaauPaeZ\nvdwaIza6BkmNdD/JjiptUKzwasVfQUnpboBNsu+WmIvpG/DPK3/cXOd79J+cUw==\n-----END CERTIFICATE-----';

  let strategy = createJwtStrategy(tokenPropertyExtractor);
  strategy.fail = (err) => {
    assert.deepEqual(err.name, 'TokenExpiredError');
    callbackCalled = true;
  };
  let req = {};
  req.token = token;
  strategy.authenticate(req, { session: false });
  assert.isTrue(callbackCalled, 'Should have throw a TokenExpiredError');
});

// same but with efilename


function tokenPropertyExtractor (req) {
  return req.token;
};

