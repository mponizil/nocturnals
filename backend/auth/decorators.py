def user_passes_test_with_ajax(test_func, login_url=None, redirect_field_name=REDIRECT_FIELD_NAME):
    if not login_url:
        from django.conf import settings
        login_url = settings.LOGIN_URL
    
    def decorator(view_func):
        def _wrapped_view(request, *args, **kwargs):
            if test_func(request.user):
                return view_func(request, *args, **kwargs)
            path = urlquote(request.get_full_path())
            tup = login_url, redirect_field_name, path
            # Hook in ajax
            if not request.is_ajax():
                return HttpResponseRedirect(\%s?%s=%s % tup)
            else:
                # In case of ajax we send 401 - unauthorized HTTP response
                return HttpResponse(\%s?%s=%s % tup, status=401)
    
        return wraps(view_func)(_wrapped_view)
    return auto_adapt_to_methods(decorator)

def login_required_with_ajax(function=None):
     actual_decorator = user_passes_test_with_ajax(
        lambda u: u.is_authenticated()
    )