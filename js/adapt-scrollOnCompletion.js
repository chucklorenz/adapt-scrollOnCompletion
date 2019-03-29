define([
	'core/js/adapt'
], function (Adapt) {

	Adapt.scrollOnCompletion = _.extend({

		model: null,

		initialize: function () {
			this.listenToOnce(Adapt, 'app:dataReady', this.onAppDataReady);
			this.listenToOnce(Adapt, 'pageView:ready', this.onPageViewReady);
		},

		onAppDataReady: function () {
			this.model = Adapt.course;
			if (!this.isExtensionEnabled()) return;
			this.listenTo(Adapt, 'remove', this.onRemove, this);
		},


		isExtensionEnabled: function () {
			var config = this.model.get('_scrollOnCompletion');
			if (config && config._isEnabled === false) return false;
			return true;
		},

		onPageViewReady: function (pageView) {
			if (!this.isExtensionEnabled()) return;
			var descendantComponents = pageView.model.findDescendantModels('components');
			_.each(descendantComponents, function (desc) {
				var exclComps= this.model.get('_scrollOnCompletion')._excludeComponents;
				if (!_.contains(exclComps, desc.attributes._component)) {
					if (desc.attributes._setCompletionOn && desc.attributes._setCompletionOn === 'inview') return;
					switch (desc.attributes._component) {
						case 'hotgraphic':
							this.listenTo(Adapt, 'popup:closed', this.onPopupClosed, this);
							break;
						case 'hotgrid':
							this.listenTo(Adapt, 'notify:closed', this.onPopupClosed, this);
							break;
						default:
							this.listenTo(desc, 'change:_isComplete', this.onIsComplete, this);
					}
				}
			}, this);
		},

		onIsComplete: function (comp) {
			if (!comp.attributes._isComplete) return;
			this.scrollBlock(comp);
		},

		onPopupClosed: function () {
			var currentComponent = this.findLastVisibleComponent();
			if (!currentComponent.attributes._isComplete) return;
			this.scrollBlock(currentComponent);
		},

		scrollBlock: function (comp) {
			var parentBlock = comp.getParent();
			var parentBlockSelector = $('.block.' + parentBlock.attributes._id);
			var parentBlockHt = parentBlockSelector.outerHeight();
			var settings = {};
			settings.duration = 500;
			settings.offset = {top: parentBlockHt};
			Adapt.scrollTo(parentBlockSelector, settings);
		},

		findLastVisibleComponent: function () {
			var page = Adapt.findById(Adapt.location._currentId);
			var children = _.filter(page.findDescendantModels('components'), function (comp) {
				return comp.get('_isVisible') === true;
			});
			return children[children.length - 1];
		}

	}, Backbone.Events);

	Adapt.scrollOnCompletion.initialize();

	return Adapt.scrollOnCompletion;

});
