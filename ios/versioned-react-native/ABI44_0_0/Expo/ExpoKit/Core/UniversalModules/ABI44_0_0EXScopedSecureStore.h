// Copyright © 2019-present 650 Industries. All rights reserved.

#if __has_include(<ABI44_0_0EXSecureStore/ABI44_0_0EXSecureStore.h>)
#import <ABI44_0_0EXSecureStore/ABI44_0_0EXSecureStore.h>

#import "ABI44_0_0EXConstantsBinding.h"

NS_ASSUME_NONNULL_BEGIN

@interface ABI44_0_0EXScopedSecureStore : ABI44_0_0EXSecureStore

- (instancetype)initWithScopeKey:(NSString *)scopeKey
                       andConstantsBinding:(ABI44_0_0EXConstantsBinding *)constantsBinding;

@end

NS_ASSUME_NONNULL_END
#endif
